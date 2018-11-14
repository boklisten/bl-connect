import { Component, OnInit } from '@angular/core';
import { MessageService } from './message/message.service';
import { LoginService } from './login/login.service';
import { UserDetailService } from './user-detail/user-detail.service';
import { TextBlock } from '@wizardcoder/bl-model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'app';

	constructor(private messageService: MessageService, private LoginService: LoginService, private userDetailService: UserDetailService) {
	}

	ngOnInit() {
    /*
    const textBlocks: TextBlock[] = [
      {
        text: 'Vi håper lesningen har gått som smurt!'
      },
      {
        text: 'Fristen er snart her og det er på tide å levere bøkene. Dette kan du lett gjøre på en av våre stands. Åpningstider og mer info om hvordan du leverer finner du på boklisten.no' 
      },
      {
        text: 'Det er viktig at du levere bøkene i tide, om du unlater dette vil det tilkomme gebyrer i henhold til leieavtalen',
        warning: true
      }
    ]


    this.LoginService.login('aholskil@gmail.com', 'password').then(() => {
      //this.messageService.sendReminder("5b796677ecc8b04c01982713", new Date(2018, 11, 2), textBlocks);
    }).catch(() => { 
      console.log('could not login...');
    });
     */
  }
}
