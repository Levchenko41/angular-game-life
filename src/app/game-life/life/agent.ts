export interface Agent {
  x: number;
  y: number;
}

export function createAgent(x: number, y: number) {
  return { x, y };
}

export function isAlive(agent: Agent, population: any): boolean {
  return !!population[`${agent.x}:${agent.y}`];
}
export function neighborsOf(agent: Agent) {
  if (agent.x< 0 || agent.y< 0) return;
  return [
    //top neighbors
    { x: agent.x - 1, y: agent.y - 1 },
    { x: agent.x, y: agent.y - 1 },
    { x: agent.x + 1, y: agent.y - 1 },

    //midle neighbors
    { x: agent.x - 1, y: agent.y },
    { x: agent.x + 1, y: agent.y },

    //bottom niighbors
    { x: agent.x - 1, y: agent.y + 1 },
    { x: agent.x, y: agent.y + 1 },
    { x: agent.x + 1, y: agent.y + 1 },
  ];
}

export function countAliveAround(agent: Agent, population: any) {

  if (!neighborsOf(agent))return
    return neighborsOf(agent)!.reduce((total, agent) => {
      return total + (isAlive(agent, population) ? 1 : 0);
    }, 0);

//   return;
}
