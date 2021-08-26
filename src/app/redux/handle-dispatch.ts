import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

interface DispathProcessStatus {
  loading: boolean;
  success: boolean;
}

/**
 *
 */
export class HandleDispatch {
  private store: Store<any>;

  private _loadAction: Function | any[];

  // Selector
  private _selectorData: any /****** A changer : trouver un type convenable */;
  private _selectorProcessStatus: any;

  // Store Observable
  private status$: Observable<DispathProcessStatus>;
  private data$: Observable<any>;

  // Subscription
  private statusSubscription: Subscription | null;
  private dataSubscription: Subscription | null;

  constructor(
    store: Store<any>,
    selectorData: Function,
    selectProcessStatus: Function
  ) {
    this.store = store;
    this.statusSubscription = null;
    this.dataSubscription = null;

    this._loadAction = () => {};
    this._selectorProcessStatus = () => {};

    // Selectors
    this._selectorData = selectorData;
    this._selectorProcessStatus = selectProcessStatus;

    // Bind Listeners to store
    this.status$ = this.store.pipe(select(this._selectorProcessStatus));
    this.data$ = this.store.pipe(select(this._selectorData));
  }

  /**
   * Get the requiements
   * Store object,
   * Load Action
   * status and Data selector
   */
  static load(
    // Global store object
    store: Store<any>,

    // Load action that is captured by the effect
    // to launch action procession in the service
    loadAction: Function | any[],

    // Select from state, the part of data that will change
    selectorData: Function,

    //
    selectProcessStatus: Function
  ): HandleDispatch {
    //  Create Instance to be able to chain differents methods
    const hd = new HandleDispatch(store, selectorData, selectProcessStatus);
    hd._loadAction = loadAction;
    return hd;
  }

  /**
   * Dispatch load action and wait while process is running
   * listen to success or errors status and then
   * handle resolve or reject
   */
  async done(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      // console.log('Exécution: ');
      // console.log(typeof this._loadAction);

      // Dispatch main action
      if (typeof this._loadAction === 'function') {
        // if type is function where just call that function
        this.store.dispatch(this._loadAction());
      } else if (this._loadAction && this._loadAction.length === 2) {
        // If type is array we call the first element that
        // are a function and give the seconds element of array as
        // argument
        // console.log(this._loadAction[1]);
        this.store.dispatch(this._loadAction[0](this._loadAction[1]));
      } else {
        throw new Error('Syntaxe error !');
      }

      // listen when success or errors and then resolve or reject
      // console.log('**** bind listener');
      //
      this.statusSubscription = this.status$
        .pipe(skip(1))
        .subscribe((status: DispathProcessStatus) => {
          // console.log('Loading change...', status);
          if (!status.success) {
            reject(new Error('Error ! Ouupss'));
            this.unsubscribe();
          }
        });

      //
      this.dataSubscription = this.data$
        .pipe(skip(1))
        .subscribe((data: any[]) => {
          // console.log('Request finish: data found !');
          // console.log(data);
          resolve(data);
          this.unsubscribe();
        });
      // }, 1000);
    });
  }

  /**
   * Unsubscribe to succes and data observable
   * when action process is finish
   */
  private unsubscribe(): void {
    this.statusSubscription?.unsubscribe();
    this.dataSubscription?.unsubscribe();
  }
}
