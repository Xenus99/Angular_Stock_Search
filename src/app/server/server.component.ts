import { Component } from '@angular/core';

@Component({
    selector:'app-server',
    templateUrl:'./server.component.html',
    styleUrls: ['./Server.component.css']
})
export class ServerComponent{
    serverId: number =10;
    serverStatus: string ='offline';
    serverCreationStatus = 'No Server Created';
    serverUpdationStatus = 'Not Updated Yet!';
    serverName = 'Test Server N'
    serverCreated = false;
    servers = ['TestServer', 'TestServer 2'];

    allowNewServer = false;

    constructor(){
        // setTimeout(() => {
        // this.allowNewServer = true;
        // }, 2000);

        this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
    }

    getColor(){
        return  this.serverStatus === 'online' ? 'green' : 'red';
    }

    onCreateServer(){
        this.serverCreationStatus = 'Server Created';
        this.servers.push(this.serverName);
        this.serverCreated = true;
    }

    onUpdateServerName(event: Event){
        this.serverUpdationStatus = (<HTMLInputElement>event.target).value;
    }
}
