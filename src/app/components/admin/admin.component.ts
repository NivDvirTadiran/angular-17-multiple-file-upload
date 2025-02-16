import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpXhrBackend} from '@angular/common/http';


type TableRow = {agentName: string, agentExten: string, state: string, agentNo: string, stateTime: string, releaseCode: string, aCDCalls: string, nonACDCalls: string, dNIS: string, aN: string};


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  timer: any;
  errors = 0;
  lastPing = '';
  pathToGo = '';
  isPaused: boolean | null = null;
  isWSChanged = false;
  // tslint:disable-next-line:variable-name
  ws_list = '';
  font = '';
  lang = '';
  url = 'accRealTime/nlat/Agents.Brief_Report.nlat?agentId=1,2,3,554,555';
  dp_app_center = 'DP_ENABLE';
  Request_TIMEOUT = 3000;
  pingXmlHttpReq: any;
  xmlHttpReq: any;
  table: HTMLElement | null = null;
  tableObj: TableRow[] = [];
  headers: any;

  constructor(private http: HttpClient, private xmlHttp: HttpXhrBackend) {
    this.ws_list = localStorage.getItem('ws_list') || '';
    this.font = localStorage.getItem('ws_dynamicFrontSize') || '';
    this.lang = localStorage.getItem('ws_Accept-Language') || '';
    this.dp_app_center = sessionStorage.getItem('DP_APP_CENTER') || '';
    //setInterval(()=> { this.runUpdateTimer() }, this.Request_TIMEOUT);
  }

  ngOnInit() {
    this.initRequest();
    this.runUpdateTimer();
  }

  initRequest() {
    console.log('initRequest');
    this.pingXmlHttpReq = new XMLHttpRequest();
    this.xmlHttpReq = new XMLHttpRequest();
/*    this.pingXmlHttpReq.open('GET', path, true);
    this.pingXmlHttpReq.onload = () => {
      if (this.pingXmlHttpReq.readyState === 4 && this.pingXmlHttpReq.status === 200) {
        this.xmlHttpReq = this.pingXmlHttpReq;
      }
    };
    this.pingXmlHttpReq.send();*/
  }


  requestUpdate() {
    console.log('requestUpdate');
    if (this.xmlHttpReq) {
      this.xmlHttpReq.open('GET', this.url, true);
      this.xmlHttpReq.setRequestHeader('RefreshMode', 'true');
      this.xmlHttpReq.onreadystatechange = () => {
        if (this.xmlHttpReq.readyState === XMLHttpRequest.DONE)
        {
          if (this.xmlHttpReq.status == 200)
          {
            //alert(self.xmlHttpReq.responseText);
            this.cacheElement.innerHTML=this.xmlHttpReq.responseText;
            let mTable = this.xmlHttpReq.responseText;
            //console.log("doContextUpdate: table - " + mTable);

            function isHTMLTableElement(elem: HTMLTableElement | HTMLElement) : elem is HTMLTableElement {
              return elem.tagName === 'TABLE';
            }



            const dom = new DOMParser().parseFromString(this.xmlHttpReq.responseText,'text/html')
            const table = dom.querySelector('table');
            this.table = table;


            this.headers = ['agentName', 'agentExten' ,'state' ,'agentNo' ,'stateTime' ,'releaseCode' ,'aCDCalls' ,'nonACDCalls' ,'dNIS' ,'aN' ]

            //const result: {agentName: string, agentExten: string, state: string, agentNo: string, stateTime: string, releaseCode: string, aCDCalls: string, nonACDCalls: string, dNIS: string, aN: string}[] = [];
            this.tableObj = [];


            if (table) {
                const rows: HTMLElement[] = [].slice.call(table.querySelectorAll('tbody tr'));
              for (const row of rows) {
                const cells: HTMLElement[] = [].slice.call(row.querySelectorAll('td'));
                const [agentName, agentExten ,state ,agentNo ,stateTime ,releaseCode ,aCDCalls ,nonACDCalls ,dNIS ,aN ]  = cells.map(c => c.innerText);
                this.tableObj.push({
                  agentName: agentName,
                  agentExten: agentExten,
                  state: state,
                  agentNo: agentNo,
                  stateTime: stateTime,
                  releaseCode: releaseCode,
                  aCDCalls: aCDCalls,
                  nonACDCalls: nonACDCalls,
                  dNIS: dNIS,
                  aN: aN
                });
              }
              //this.tableObj = result;
              //console.log(JSON.stringify(result).toString());
            }



            this.runUpdateTimer();
            this.errors=0;

            var ServerTime = this.xmlHttpReq.getResponseHeader("accServerTime");



            /*var spanServerTime = this.titleOrTiltle_md().document.getElementById("accServerTime");
            if((spanServerTime != null) && (ServerTime != null) && (spanServerTime.innerHTML != ServerTime)){
              console.log("Updating accServerTime - " + ServerTime);
              spanServerTime.innerHTML = ServerTime;
            }*/
          }
          else if (this.xmlHttpReq.status == 401 )
          {
            this.runUpdateTimer(this.Request_TIMEOUT);

            if ( this.isRefreshing() == false )
            {
              this.refreshToken(false);

            }
            else
            {
              console.log( "Token is expired and refresh process is already on");
            }
          }
          else
          {
            this.errors++;
            this.runUpdateTimer(this.Request_TIMEOUT*5);
          }
        }
      };
      this.xmlHttpReq.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
      this.xmlHttpReq.send();
    }
  }

  requestUpdatePing(url: string) {
    if (this.pingXmlHttpReq) {
      this.http.get(url, {observe: 'response'}).subscribe(response => {
        this.doPingContextUpdate(response);
      });
    }
  }

  cacheElement=document.createElement("span");
  doContextUpdate()
  {
    console.log("doContextUpdate: this.xmlHttpReq.readyState - " + this.xmlHttpReq.readyState);
    if (this.xmlHttpReq.readyState === XMLHttpRequest.DONE)
    {
      if (this.xmlHttpReq.status == 200)
      {
        //alert(self.xmlHttpReq.responseText);
        this.cacheElement.innerHTML=this.xmlHttpReq.responseText;
        console.log("doContextUpdate: table - " + this.xmlHttpReq.responseText);
        var table = this.xmlHttpReq.responseText.tableToJSON();
        console.log("doContextUpdate: table - " + table);
        let x=this.cacheElement.getElementsByTagName("onRefresh");
        //alert(x.length);
        //console.log("doContextUpdate: cacheElement - " + cacheElement + ", x - " + x + ", length - " + x.length);
        for(var i=0; i< x.length ; i++) {
          //console.log("doContextUpdate: eval(x[i].getAttribute(\"event\") - " + eval(x[i].getAttribute("event"));
          //alert(x[i].getAttribute("event")+"(cacheElement)");
          const eventFunction = new Function('cacheElement', x[i].getAttribute("event") + "(cacheElement)");
          eventFunction(this.cacheElement);
        }
        this.runUpdateTimer();
        this.errors=0;

        //10-Aug-2022 YR BZ#56641
        //var today = new Date();
        //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var ServerTime = this.xmlHttpReq.getResponseHeader("accServerTime");



        var spanServerTime = this.titleOrTiltle_md().document.getElementById("accServerTime");
        //console.log("accServerTime: " + ServerTime + ", Local: " + time);.contains("Period")
        if((spanServerTime != null) && (ServerTime != null) && (spanServerTime.innerHTML != ServerTime)){
          //spanServerTime.innerHTML = time;
          console.log("Updating accServerTime - " + ServerTime);
          spanServerTime.innerHTML = ServerTime;
          //spanServerTime.innerHTML = self.xmlHttpReq.getResponseHeader("accServerTime");

          //var spanServerTime = parent.parent.title.document.createElement('div');
          //spanServerTime.innerHTML = self.xmlHttpReq.getResponseHeader("accServerTime");
          //parent.parent.title.document.getElementById("accServerTime").appendChild(spanServerTime);
        }
      }
      else if (this.xmlHttpReq.status == 401 )
      {
        this.runUpdateTimer(this.Request_TIMEOUT);

        if ( this.isRefreshing() == false )
        {
          this.refreshToken(false);

        }
        else
        {
          console.log( "Token is expired and refresh process is already on");
        }
      }
      else
      {
        this.errors++;
        this.runUpdateTimer(this.Request_TIMEOUT*5);
      }
    }
  }

  titleOrTiltle_md() {
    const mainPage = parent.parent.document.getElementById("main-page");
    if (mainPage) {
      var currentTitle = mainPage.getElementsByTagName("frame")[0].name;
      var Obj: any = null;
      if (currentTitle == "title") {
        Obj = parent.parent.document.getElementsByTagName('title');
      }
      if (currentTitle == "title_md") {
        Obj = parent.parent.document.getElementsByTagName('title_md');
      }
      return Obj;
    }
    return null;
  }


  doPingContextUpdate(response: any) {
    if (response.status === 200) {
      window.location.assign(this.pathToGo + this.getParams());
    } else if (response.status === 401) {
      this.errors++;
      this.runUpdateTimer(this.Request_TIMEOUT * 5);
      if (!this.isRefreshing()) {
        if (this.refreshToken(true)) {
          window.location.assign(this.pathToGo + this.getParams());
        }
      }
    } else {
      this.errors = 8;
      this.isPaused = null;
      this.runUpdateTimer();
    }
  }

  refreshToken(toClusterIp: boolean): boolean {
    this.showRefresh();
    console.log('Starting Token refresh process.');
    const data = JSON.stringify({
      refreshToken: sessionStorage.getItem('auth-refreshtoken') || ''
    });

    const myUrl = window.location.href;
    const myIp = myUrl.split('//')[1].split(':')[0];
    let clusterIp;
    const [ws1, ws2] = this.ws_list.split(';');
    const ws1Ip = this.getIp(ws1);
    const ws2Ip = this.getIp(ws2);
    clusterIp = myIp === ws1Ip && ws2Ip ? ws2Ip : ws1Ip;
    const myHost = toClusterIp ? clusterIp : myIp;
    const myPort = myUrl.split(':')[2].split('/')[0];
    this.http
      .post(
        `https://${myHost}:${myPort}/Aeonix-App-Center/auth/refreshtoken`,
        data,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token') || ''}`
          })
        }
      )
      .subscribe(
        response => {
          const responseBody = JSON.parse(response as any);
          sessionStorage.setItem('auth-refreshtoken', responseBody.refreshToken.toString());
          sessionStorage.setItem('token', responseBody.accessToken.toString());
          document.cookie = `Authorization=${sessionStorage.getItem('token')}; path=/accRealTime;`;
          if (responseBody.accessToken.toString() !== null) {
            this.requestUpdate();
          }
          this.closeRefresh();
          return true;
        },
        () => {
          console.log('Token refresh process failed!');
          this.closeRefresh();
          return false;
        }
      );
    return false;
  }

  getParams(): string {
    let a1: string;
    if (this.dp_app_center === 'DP_ENABLE') {
      const userName = `GateUser: ${JSON.parse(sessionStorage.getItem('user') as any).username}`;
      const pass = sessionStorage.getItem('token') || '';
      const refreshtoken = sessionStorage.getItem('auth-refreshtoken') || '';
      a1 = `${userName},${pass},${refreshtoken}`;
    } else {
      const userName = sessionStorage.getItem('userName') || '';
      const pass = sessionStorage.getItem('pass') || '';
      a1 = `${userName},${pass}`;
    }
    return `?params=${btoa(a1)}`;
  }

  getIp(url: string): string | null {
    return url && url !== 'null' ? url.split('//')[1].split(':')[0] : null;
  }

  runUpdateTimer(delay: number = this.Request_TIMEOUT) {
    if (this.errors === 5) {
      this.showAlert();
    }

    if (this.errors < 10) {
      this.timer = setTimeout(() => this.requestUpdate(), delay);
    } else {
      console.log('ajaxRefresh::runUpdateTimer() - errors ' + this.errors);
      if (this.isPaused === null) {
        this.isPaused = true;
        this.isWSChanged = false;
        this.showAlert();
        const [ws1, ws2] = this.ws_list.split(';');
        const myUrl = window.location.href;
        const myIp = myUrl.split('//')[1].split(':')[0];
        const ws1Ip = this.getIp(ws1);
        const ws2Ip = this.getIp(ws2);

        const restUrl = '/accRealTime/login.jsp';

        if (myIp === ws1Ip && ws2 !== null) {
          if (ws2 === this.lastPing) {
            this.lastPing = ws1;
            this.pathToGo = `${ws1}${restUrl}`;
            this.requestUpdatePing(`${ws1}/accAgent/ping`);
          } else {
            this.lastPing = ws2;
            this.pathToGo = `${ws2}${restUrl}`;
            this.requestUpdatePing(`${ws2}/accAgent/ping`);
          }
        } else {
          this.pathToGo = `${ws1}${restUrl}`;
          this.requestUpdatePing(`${ws1}/accAgent/ping`);
        }
      }
    }
  }

  showAlert() {
    console.log('ajaxRefresh:showAlert - connectionErr');
    const spanErr = document.getElementById('connectionErr');
    if (spanErr) {
      spanErr.style.color = 'red';
      spanErr.innerHTML = 'Connection Lost - Trying to Reconnect';
    }
  }

  closeAlert() {
    console.log('ajaxRefresh:closeAlert - connectionErr');
    const spanErr = document.getElementById('connectionErr');
    if (spanErr) {
      spanErr.innerHTML = '';
    }
  }

  showRefresh() {
    console.log('ajaxRefresh:showRefresh - connectionErr');
    const spanErr = document.getElementById('connectionErr');
    if (spanErr) {
      spanErr.innerHTML = 'Refreshing..';
    }
  }

  closeRefresh() {
    console.log('ajaxRefresh:closeRefresh - connectionErr');
    const spanErr = document.getElementById('connectionErr');
    if (spanErr) {
      spanErr.innerHTML = '';
    }
  }

  private isRefreshing() {
    return false;
  }
}
