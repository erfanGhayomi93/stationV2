type Listener = {
	[key: string]: {
		once: boolean;
		cb: <T>(arg: T) => void,
	}
}

class IpcMain {
	private _listeners: Listener;

	constructor() {
		this._listeners = {};
	}

	removeHandler(channel: string) {
		delete this._listeners[channel];
	}

	removeAllHandlers(...channels: string[]) {
		for (let i = 0; i < channels.length; i++) {
			this.removeHandler(channels[i]);
		}
	}

	handle<T>(channel: string, listener: (arg: T) => void) {
		this._listeners[channel] = {
			once: false,
			cb: (arg: any) => listener(arg)
		};
	}
	
	handleOnce<T>(channel: string, listener: (arg: T) => void) {
		this._listeners[channel] = {
			once: true,
			cb: (arg: any) => listener(arg)
		};
	}

	send<T>(channel: string, arg?: T) {
		const listener = this._listeners[channel];
		if (!listener) return;

		listener.cb.call(null, arg);
		if (listener.once) this.removeHandler(channel);
	}
}

const ipcMain = Object.freeze(new IpcMain());

export default ipcMain;