type TAppState = 'Loading' | 'FetchedConfig' | 'LoggedIn' | 'LoggedOut' | 'Crashed';

interface IAppState {
     appState: TAppState;
     setAppState: (value: TAppState) => void;
}
