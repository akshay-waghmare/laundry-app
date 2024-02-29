export class Bet {
    betId: number;          // Unique identifier for the bet
    userId: number;         // ID of the user placing the bet
    matchId: number;        // ID of the match on which the bet is placed
    betType: string;        // Type of bet, e.g., 'Back' or 'Lay'
    amount: number;         // Amount of money placed on the bet
    odds: number;           // Odds at which the bet was placed
    potentialWin: number;   // Potential winnings from the bet
    status: string;         // Status of the bet, e.g., 'Pending', 'Won', 'Lost'
    placedAt: Date;         // Timestamp when the bet was placed
    marketName: string;
  
    constructor(init?: Partial<Bet>) {
      Object.assign(this, init);
    }
  }