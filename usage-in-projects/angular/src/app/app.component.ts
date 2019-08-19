import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Components} from "maxim1006-wc";
import MFetch = Components.MFetch;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild("mFetch", {
    static: false
  })
  mFetch: MFetch;

  ngAfterViewInit(): void {
    console.log(this.mFetch);
  }

  _mFetchSearchInputEmit(event) {
    console.log(event);
  }
}
