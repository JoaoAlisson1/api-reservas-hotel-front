export interface ReservaRequest {
  checkIn: string;            // LocalDateTime → string
  checkOut: string;           // LocalDateTime → string
  status: string;             // StatusReserva enum → string

  funcionarioUuid: string;    // UUID → string
  quartoId: number;           // Long → number

  hospedeUUIDs: string[];     // List<UUID> → string[]
}
