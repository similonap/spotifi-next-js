import { seedSongs } from "./database/store";

 
export function register() {
  seedSongs().catch(err => console.error("Error seeding songs:", err));
}