import { createAgent } from "./agent";

export function range(size:number) {
    return Array.from({ length: size  }, (_, index) => index);
  }

export function populationRandom(rows:number, columns:number){
const population:any={}
range(columns).forEach((_,i)=>{
range(rows).forEach((_,j)=>{
    if (Math.random() <= 0.5) return;
    population[`${i}:${j}`] = createAgent(i, j);

})
})
return population
}