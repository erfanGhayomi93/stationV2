type Channels = {
	[key: string]: (<T>(arg: T) => void)[]
}

class IpcMain {
	private _channels: Channels;

	constructor() {
		this._channels = {};
	}

	removeHandler<T>(channel: string, handler: (arg: T) => void) {
		for (let i = 0; i < this._channels[channel].length; i++) {
			const listener = this._channels[channel][i];

			if (listener.toString() === handler?.toString()) this._channels[channel].splice(i, 1);
		}
	}

	removeAllHandlers(channel: string) {
		this._channels[channel] = [];
	}

	removeChannel(channel: string) {
		if (!(channel in this._channels)) return;

		this._channels[channel] = [];
		delete this._channels[channel];
	}

	removeAllChannels(...channels: string[]) {
		for (let i = 0; i < channels.length; i++) {
			this.removeChannel(channels[i]);
		}
	}

	handle<T>(channel: string, listener: (arg: T) => void) {
		if (!(channel in this._channels)) this._channels[channel] = [];

		// @ts-expect-error
		this._channels[channel].push(listener);
	}

	send<T>(channel: string, arg?: T) {
		const listener = this._channels[channel];
		if (!Array.isArray(listener)) return;

		listener.forEach((l) => l.call(null, arg));
	}
}

const ipcMain = Object.freeze(new IpcMain());

export default ipcMain;