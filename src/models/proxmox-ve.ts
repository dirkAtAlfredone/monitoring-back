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

export interface INodeNet {  
  priority: number;
  autostart: number;
  iface: string;
  method: "static" | "manual" | "dhcp" | "loopback" | "auto";
  bridge_stp?: "on" | "off";
  cidr?: string;
  type: "bridge" | "bond" | "eth" | "alias" | "vlan" | "fabric" | "OVSBridge" | "OVSBond" | "OVSPort" | "OVSIntPort" | "vnet" | "unknown";
  method6?: "static" | "manual" | "dhcp" | "loopback" | "auto";
  address?: string;
  bridge_fd?: string;
  gateway?: string;
  netmask?: string | number;
  active: number;
  bridge_ports?: string;
  families?: ("inet" | "inet6")[]
}