export interface INode {
  node: string;
  status: 'online' | 'offline';
  maxcpu: number;
  maxmem: number;
  cpus: number;
  mem: number;
  uptime: number;
  type: 'node';
}

export interface IVM {
  vmid: number;
  name: string;
  status: 'running' | 'stopped' | 'paused';
  type: 'qemu' | 'lxc';
  node: string;
  cpu: number;
  maxcpu: number;
  mem: number;
  maxmem: number;
  uptime: number;
  [key: string]: any;
}