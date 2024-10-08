import { Ticker } from "./types";

// export const BASE_URL = "wss://ws.backpack.exchange/"
export const BASE_URL = "ws://localhost:3001"

export class SignalingManager {
    private ws: WebSocket;
    private static instance: SignalingManager;
    private bufferedMessages: any[] = [];
    private callbacks: any = {};
    private id: number;
    private initialized: boolean = false;

    private constructor() {
        this.ws = new WebSocket(BASE_URL);
        this.bufferedMessages = [];
        this.id = 1;
        this.init();
    }

    public static getInstance() {
        if (!this.instance)  {
            this.instance = new SignalingManager();
        }
        return this.instance;
    }

    init() {
        this.ws.onopen = () => {
            this.initialized = true;
            this.bufferedMessages.forEach(message => {
                this.ws.send(JSON.stringify(message));
            });
            this.bufferedMessages = [];
        }
        this.ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const type = message.data.e;
            if (this.callbacks[type]) {
                this.callbacks[type].forEach(({ callback }) => {
                    if (type === "ticker") {
                        const newTicker: Partial<Ticker> = {
                            lastPrice: message.data.c,
                            high: message.data.h,
                            low: message.data.l,
                            volume: message.data.v,
                            quoteVolume: message.data.V,
                            symbol: message.data.s,
                        }
                        console.log(newTicker);
                        callback(newTicker);
                   }
                   if (type === "depth") {
                        // const newTicker: Partial<Ticker> = {
                        //     lastPrice: message.data.c,
                        //     high: message.data.h,
                        //     low: message.data.l,
                        //     volume: message.data.v,
                        //     quoteVolume: message.data.V,
                        //     symbol: message.data.s,
                        // }
                        // console.log(newTicker);
                        // callback(newTicker);
                        const updatedBids = message.data.b;
                        const updatedAsks = message.data.a;
                        callback({ bids: updatedBids, asks: updatedAsks });
                    }
                });
            }
        }
    }

    sendMessage(message: any) {
        const messageToSend = {
            ...message,
            id: this.id++
        }
        if (!this.initialized) {
            this.bufferedMessages.push(messageToSend);
            return;
        }
        this.ws.send(JSON.stringify(messageToSend));
    }

    async registerCallback(type: string, callback: any, id: string) {
        this.callbacks[type] = this.callbacks[type] || [];
        this.callbacks[type].push({ callback, id });
        // "ticker" => callback
    }

    async deRegisterCallback(type: string, id: string) {
        if (this.callbacks[type]) {
            const index = this.callbacks[type].findIndex(callback => callback.id === id);
            if (index !== -1) {
                this.callbacks[type].splice(index, 1);
            }
        }
    }
}


// import { Ticker } from "./types";

// // export const BASE_URL = "wss://ws.backpack.exchange/";
// export const BASE_URL = "wss://localhost:3001";

// export class SignalingManager {

//     private ws: WebSocket;
//     private static instance: SignalingManager;
//     private bufferedMesages: any[] = [];
//     private callback: any = {};
//     private id: number;
//     private initialized: boolean = false;

//     private constructor() {
//         this.ws = new WebSocket(BASE_URL);
//         this.bufferedMesages = [];
//         this.id = 1;
//         this.init();
//     }

//     public static getInstance() {
//         if (!this.instance) {
//             this.instance = new SignalingManager();
//         }
//         return this.instance;
//     }

//     init() {
//         this.ws.onopen = () => {
//             this.initialized = true;
//             this.bufferedMesages.forEach((message) => {
//                 this.ws.send(JSON.stringify(message));
//             });
//             this.bufferedMesages = [];
//         }

//         this.ws.onmessage = (event) => {
//             const message = JSON.parse(event.data);
//             const type = message.data.e;
//             if (this.callback[type]) {
//                 this.callback[type].forEach(({ callback }) => {
//                     if (type === "ticker") {
//                         const newTicker: Partial<Ticker> = {
//                             lastPrice: message.data.c,
//                             high: message.data.h,
//                             low: message.data.l,
//                             volume: message.data.v,
//                             quoteVolume: message.data.V,
//                             symbol: message.data.s,
//                         };
//                         callback(newTicker);
//                     }
//                     if (type === "depth") {
//                         const updatedBids = message.data.b;
//                         const updatedAsks = message.data.a;
//                         callback({ bids: updatedBids, asks: updatedAsks });
//                     }
//                 });
//             }
//         }
//     }

//     sendMessage(message: any){
//         const messageToSend = {
//             ...message,
//             id: this.id++,
//         };
//         if(!this.initialized){
//             this.bufferedMesages.push(messageToSend);
//             return;
//         }
//         this.ws.send(JSON.stringify(messageToSend));
//     }

//     async registerCallback(type: string, callback: any, id: string){
//         this.callback[type] = this.callback[type] || [];
//         this.callback[type].push({callback, id});
//     }

//     async deRegisterCallback(type: string, id: string){
//         if(this.callback[type]){
//             const index = this.callback[type].findIndex((callback) => callback.id === id);
//             if(index !== -1){
//                 this.callback[type].splice(index, 1);
//             }
//         }
//     }

// }