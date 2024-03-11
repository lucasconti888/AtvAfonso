import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { environment } from './environment';
import { ApiconnectService } from './services/apiconnect.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  apiUrl: string | undefined;
  title = 'AtvAfonso';

  constructor(private router: Router, private apiConnectService: ApiconnectService) {
    this.apiUrl = environment.apiUrl;
  }

  ngOnInit(): void {
    this.apiConnectService.getCars().subscribe(response=> {
      console.log(response.body)
      return response
    })   

  }
  
}
