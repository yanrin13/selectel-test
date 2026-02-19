import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Item {
  item: string;
  value: number;
  selected?: boolean;
}

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.css'],
})
export class ListsPage implements OnInit {
  data: any;
  currentType: string = 'type1';
  items: Item[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('/data.json').subscribe({
      next: (res) => {
        console.log('данные успешно загружены', res);
        this.data = res;
        this.loadType(this.currentType);
      },
      error: (err) => {
        console.error('ошибка при загрузке json', err);
        if (err.status === 404) {
          console.error('файл не найден');
        }
      },
    });
  }

  loadType(type: string) {
    this.currentType = type;
    this.items = this.data[type].items.map((i: any) => ({ ...i, selected: false }));
  }

  toggleItem(item: Item) {
    item.selected = !item.selected;
  }

  get selectedCount(): number {
    return this.items.filter((i) => i.selected).length;
  }

  get totalValue(): number {
    return this.items.filter((i) => i.selected).reduce((sum, i) => sum + i.value, 0);
  }
}
