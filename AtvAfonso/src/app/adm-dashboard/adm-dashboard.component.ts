import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { ApiconnectService } from '../services/apiconnect.service';
import { environment } from '../environment';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-adm-dashboard',
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    RouterOutlet,
    MatIcon,
    NgApexchartsModule,
  ],
  templateUrl: './adm-dashboard.component.html',
  styleUrl: './adm-dashboard.component.css',
})
export class AdmDashboardComponent implements OnInit {
  title = 'adm-dash';
  slideAnimationActive: boolean = false;

  visibleCards: any[];
  selected: string = '';

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  apiUrl: string | undefined;

  ngOnInit(): void {

    this.apiConnectService.getCars().subscribe((response) => {
      if (response.body) {
        for (let i = 0; i < response.body.length; i += 3) {
          console.log(
            'mês: ',
            response.body[i].mes,
            [response.body[i].descricao, response.body[i].quantidade_atestados],
            [
              response.body[i + 1].descricao,
              response.body[i + 1]?.quantidade_atestados,
            ],
            [
              response.body[i + 2]?.descricao,
              response.body[i + 2]?.quantidade_atestados,
            ]
          );
        }
      }

      return response.body;
    });
  }

  constructor(private apiConnectService: ApiconnectService) {
    this.apiUrl = environment.apiUrl;
    this.visibleCards = [] as any[];
    this.selected = '11';

    this.chartOptions = {
      series:
        [
          {
            name: 'ansiedade generalizada',
            data: [96, 41, 35, 51, 49, 62, 69, 91, 21],
            color: '#CC00FF',
          },
          {
            name: 'transtorno misto ansioso e depressivo',
            data: [12, 32, 78, 54, 98, 43, 56, 76, 100],
            color: '#6D6AFF',
          },
          {
            name: 'transtornos de adaptação',
            data: [45, 21, 24, 68, 135, 61, 23, 67, 110],
            color: '#00E096',
          },
        ],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
        ],
      },
    };
  }

  cards = [
    {
      title: 'Card 1',
      content: {
        perc: '22',
      },
    },
    {
      title: 'Card 2',
      content: {
        perc: '23',
      },
    },
    {
      title: 'Card 3',
      content: {
        perc: '24',
      },
    },
    {
      title: 'Card 4',
      content: {
        perc: '25',
      },
    },
    {
      title: 'Card 5',
      content: {
        perc: '26',
      },
    },
    {
      title: 'Card 6',
      content: {
        perc: '27',
      },
    },
    {
      title: 'Card 7',
      content: {
        perc: '28',
      },
    },
  ];

  isSlidRight: boolean = false;

  focus(event: MouseEvent) {
    const currentFocusedElements = document.querySelectorAll('.focus');
    currentFocusedElements.forEach((element) => {
      element.classList.remove('focus');
    });

    const cardElement = (event.currentTarget as HTMLElement).closest(
      '.simple-card'
    );
    if (cardElement) {
      const selectedCard = this.cards.find(
        (card) => card.title === cardElement.textContent
      );
      this.selected = selectedCard?.content.perc || '';
      cardElement.classList.add('focus');
      console.log(cardElement);
    }
  }

  updateVisibleCards() {
    this.visibleCards = this.cards.slice(this.startIndex, this.endIndex + 1);
  }

  startIndex = 0;
  endIndex = 3;

  next() {
    if (this.endIndex < this.cards.length - 1) {
      this.startIndex += 1;
      this.endIndex += 1;
    } else {
      this.startIndex = 0;
      this.endIndex = 3;
    }

    this.slideAnimationActive = true;
    this.updateVisibleCards();

    setTimeout(() => {
      this.slideAnimationActive = false;
    }, 300);
  }

  slideRight() {
    this.isSlidRight = !this.isSlidRight;
  }
}
