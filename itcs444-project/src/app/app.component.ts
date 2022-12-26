import { Component } from '@angular/core';
import { ColdStoreDataService, User} from './cold-store-data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user: User = {} as User;
  constructor(public coldStoreDataService: ColdStoreDataService) {
    this.user = coldStoreDataService.getUserByEmail(coldStoreDataService.loggedEmail) as User;


    }
}

