export interface BuyTicketPayload {
    card_number: string;
    card_holder: string;
    expiry_date: string;
    cvv: string;
    amount_of_money: number;
    amount_of_tickets: number;
}