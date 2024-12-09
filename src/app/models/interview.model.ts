export interface Interview {
  id: string;
  email: string;
  type: 'Primera entrevista' | 'Segunda entrevista';
  name: string;
  surname: string;
  phone?: string;
  physicalDescription?: string;
  skillsDescription?: string;
  technicalQuestionsScore: number;
  technicalTestScore?: number;
}
