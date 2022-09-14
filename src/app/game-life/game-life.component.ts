import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  Agent,
  countAliveAround,
  createAgent,
  isAlive,
  neighborsOf,
} from './life/agent';
import { populationRandom } from './life/population';

@Component({
  selector: 'app-game-life',
  templateUrl: './game-life.component.html',
  styleUrls: ['./game-life.component.css'],
})
export class GameLifeComponent implements OnInit {
  a: number = 4;
  b: number = 5;
  c: any = '0:1';
  kernel: number = 1;
  agent: Agent = {
    x: 2,
    y: 2,
  };
  public popy: any;
  pop: any = {
    '2:1': { x: 2, y: 1 },
    '2:2': { x: 2, y: 2 },
    '2:3': { x: 2, y: 3 },
    '4:1': { x: 4, y: 1 },
    '4:2': { x: 4, y: 2 },
    '1:3': { x: 1, y: 3 },
  };

  constructor() {}
  canvas: any;
  ctx: any;
  widthCanvas: number = 0;
  heigthCanvas: number = 0;
  offwidthCanvas: number = 0;
  offheigthCanvas: number = 0;

  ngOnInit(): void {
    this.canvas = document.getElementById('canvas')!;
    this.ctx = this.canvas.getContext('2d')!;
    this.widthCanvas = this.canvas!.width;
    this.heigthCanvas = this.canvas!.height;
    this.offwidthCanvas=this.canvas.offsetWidth
    this.offheigthCanvas = this.canvas!.offsetHeight;
    console.log(this.widthCanvas);
    console.log(this.heigthCanvas);
    console.log(this.canvas);
    this.pop = populationRandom(this.widthCanvas, this.heigthCanvas);
    console.log(this.widthCanvas);
    //  console.log(this.ctx)
    console.log(createAgent(this.a, this.b));
    let a = neighborsOf(this.agent);
    console.log(a);
    console.log('population iS', this.pop);

    this.gridConvas();
  }

  click() {
    console.log('aa', this.agent);
    console.log('population Is', this.pop);
    // console.log('checked', this.checked)
    console.log(isAlive(this.agent, this.pop));
    console.log(countAliveAround(this.agent, this.pop));
    this.evolve();
  }
  evolve() {
    const evolved: any = {};
    const checked: any = {};

    Object.values(this.pop).forEach((agent: any) => {
      const alive = countAliveAround(agent, this.pop);
      if (alive == 2 || alive == 3) {
        evolved[`${agent.x}:${agent.y}`] = agent;
      }
      if (neighborsOf(agent)) {
        neighborsOf(agent)!.forEach((neiborAgent: any) => {
          if (checked[`${neiborAgent.x}:${neiborAgent.y}`]) return;
          checked[`${neiborAgent.x}:${neiborAgent.y}`] = true;
          if (countAliveAround(neiborAgent, this.pop) !== 3) return;
          evolved[`${neiborAgent.x}:${neiborAgent.y}`] = createAgent(
            neiborAgent.x,
            neiborAgent.y
          );
        });
      }
    });
   
    this.pop = evolved;
    this.gridConvas();
  }

  gridConvas() {
    this.normalizeScale()
    this.ctx.strokeStyle = 'rgba(0,0,0, 0.1)';

    console.log('gridC', this.canvas.width);
    console.log('gridC', this.heigthCanvas);
    console.log('');
    this.ctx.clearRect(
      0,
      0,
      this.widthCanvas ,
      this.heigthCanvas
    );
    this.ctx.fillStyle = '#000000';
    Object.values(this.pop).forEach((agent: any) => {
      this.ctx.fillRect(
        agent.y * this.kernel,
        agent.x * this.kernel,
        this.kernel,
        this.kernel
      );
    });
    
  }
  normalizeScale = () => {
    const { devicePixelRatio: pixelRatio } = window;

    if (pixelRatio > 1) {
      this.canvas.width = this.offwidthCanvas * pixelRatio;
      this.canvas.height = this.offheigthCanvas * pixelRatio;
      this.canvas.style.width = `${this.offwidthCanvas}px`;
      this.canvas.style.height = `${this.offheigthCanvas}px`;
      this.ctx.scale(pixelRatio, pixelRatio);
    }
  };
}
