export interface Mission {
  _id: string;
  title: string;
  description: string;
  status: string;
  difficulty: "Baja" | "Media" | "Alta" | "Imposible";
}