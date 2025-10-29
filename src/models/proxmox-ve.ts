export interface INode {
  node: string;
  status: 'online' | 'offline';
  maxcpu: number;
  maxmem: number;
  cpus: number;
  mem: number;
  uptime: number;
  type: 'node';
  id: string;
  tags: string[];
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
  id: string;
  tags: string[];
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

export interface IVMNet {
  data: {
    result: IVMNetResult[];
  };
}

export interface IVMNetResult {
  "name": string;
  "hardware-address"?: string;
  "ip-addresses"?: {
    "ip-address": string;
    "ip-address-type": "ipv4" | "ipv6";
    "prefix": number;
    [key: string]: unknown;
  }[];
  "statistics"?: {
    "rx-packets": number;
    "tx-packets": number;
    "rx-bytes": number;
    "tx-bytes": number;
    "rx-dropped": number;
    "tx-dropped": number;
    "rx-errs": number;
    "tx-errs": number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};