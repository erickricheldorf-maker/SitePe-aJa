import type { MaintenanceRequest, NewRequestInput, RequestStatus } from '@/site/types/maintenance';

const STORAGE_KEY = 'manutencao.requisicoes.v1';

const daysAgo = (days: number, hours = 9): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(hours, 15, 0, 0);
  return date.toISOString();
};

const SEED_REQUESTS: MaintenanceRequest[] = [
  {
    id: 'seed-1',
    equipment: 'Prensa hidráulica PH-04',
    serialNumber: 'PH4-2019-00873',
    partName: 'Vedação do cilindro principal',
    referenceCode: 'VED-CIL-150',
    photoDataUrl: null,
    urgency: 'critica',
    symptoms: 'Vazamento de óleo no cilindro, pressão caindo durante o ciclo. Máquina parada.',
    status: 'cotacao',
    createdAt: daysAgo(2, 7),
    updatedAt: daysAgo(2, 9),
  },
  {
    id: 'seed-2',
    equipment: 'Esteira transportadora L2',
    serialNumber: 'EST-L2-7721',
    partName: 'Rolamento 6205-2RS',
    referenceCode: 'SKF-6205-2RS',
    photoDataUrl: null,
    urgency: 'media',
    symptoms: 'Ruído metálico constante na polia de retorno, aumento de temperatura.',
    status: 'pendente',
    createdAt: daysAgo(1, 14),
    updatedAt: daysAgo(1, 14),
  },
  {
    id: 'seed-3',
    equipment: 'Compressor de ar CP-01',
    serialNumber: 'CP01-XK-4410',
    partName: 'Filtro de ar da admissão',
    referenceCode: 'FLT-AR-90',
    photoDataUrl: null,
    urgency: 'baixa',
    symptoms: 'Troca preventiva programada. Filtro com acúmulo de poeira visível.',
    status: 'entregue',
    createdAt: daysAgo(6, 10),
    updatedAt: daysAgo(3, 16),
  },
  {
    id: 'seed-4',
    equipment: 'Torno CNC T-12',
    serialNumber: 'TCNC-T12-0358',
    partName: 'Correia dentada do fuso',
    referenceCode: '',
    photoDataUrl: null,
    urgency: 'critica',
    symptoms: 'Correia rompeu durante a usinagem. Eixo travado, linha de produção parada.',
    status: 'comprado',
    createdAt: daysAgo(3, 8),
    updatedAt: daysAgo(1, 11),
  },
];

const generateId = (): string =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const readAll = (): MaintenanceRequest[] | null => {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === null) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as MaintenanceRequest[]) : null;
  } catch {
    return null;
  }
};

const writeAll = (requests: MaintenanceRequest[]): void => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
};

export const getRequests = (): MaintenanceRequest[] => {
  const stored = readAll();
  if (stored) return stored;
  writeAll(SEED_REQUESTS);
  return SEED_REQUESTS;
};

export const addRequest = (input: NewRequestInput): MaintenanceRequest => {
  const now = new Date().toISOString();
  const request: MaintenanceRequest = {
    ...input,
    id: generateId(),
    status: 'pendente',
    createdAt: now,
    updatedAt: now,
  };
  writeAll([request, ...getRequests()]);
  return request;
};

export const updateRequestStatus = (id: string, status: RequestStatus): MaintenanceRequest[] => {
  const updated = getRequests().map((request) =>
    request.id === id ? { ...request, status, updatedAt: new Date().toISOString() } : request,
  );
  writeAll(updated);
  return updated;
};
