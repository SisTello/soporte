export type AssetState = 'Operativo' | 'En mantenimiento' | 'Fuera de servicio';
export type AssetStatus = 'Todos' | AssetState;

export interface AssetRecord {
  id: number;
  codigo: string;
  numeroInventarioContable: string;
  nombre: string;
  categoria: string;
  fabricante: string;
  marca: string;
  serie: string;
  estado: AssetState;
  responsable: string;
  departamento: string;
  sucursal: string;
  ubicacion: string;
  detalle: string;
  observacion: string;
  fechaAdquisicion: string;
}

export interface AssetFormState {
  codigo: string;
  numeroInventarioContable: string;
  categoria: string;
  fabricante: string;
  marca: string;
  serie: string;
  sucursal: string;
  departamento: string;
  ubicacion: string;
  detalle: string;
  estado: Exclude<AssetStatus, 'Todos'>;
  observacion: string;
}
