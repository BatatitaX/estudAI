import type { State } from './data';
export const milestones = [
 {id:'first',name:'Primeiro passo',description:'Conclua sua primeira tarefa.',metric:'tasks',goal:1,icon:'check'},
 {id:'focus',name:'Hora de focar',description:'Conclua uma sessão de foco.',metric:'sessions',goal:1,icon:'timer'},
 {id:'sprout',name:'Pegando o ritmo',description:'Estude em 3 dias diferentes.',metric:'days',goal:3,icon:'leaf'},
 {id:'sunrise',name:'Semana de evolução',description:'Estude em 7 dias diferentes.',metric:'days',goal:7,icon:'sun'},
 {id:'tasks',name:'Missão cumprida',description:'Conclua 20 tarefas diferentes.',metric:'tasks',goal:20,icon:'tasks'},
 {id:'memory',name:'Memória em ação',description:'Registre 50 revisões de flashcards.',metric:'reviews',goal:50,icon:'cards'},
 {id:'quiz',name:'Conhecimento em prática',description:'Conclua 5 quizzes.',metric:'quizzes',goal:5,icon:'sparkles'},
 {id:'library',name:'Foco acumulado',description:'Acumule 5 horas de foco.',metric:'minutes',goal:300,icon:'book'},
 {id:'stars',name:'Constância que cresce',description:'Estude em 30 dias diferentes.',metric:'days',goal:30,icon:'star'},
 {id:'reader',name:'Sempre aprendendo',description:'Conclua 10 sessões de foco.',metric:'sessions',goal:10,icon:'target'},
 {id:'tasks50',name:'Organização em dia',description:'Conclua 50 tarefas.',metric:'tasks',goal:50,icon:'tasks'},
 {id:'focus25',name:'Foco de verdade',description:'Conclua 25 sessões.',metric:'sessions',goal:25,icon:'timer'},
 {id:'days14',name:'Duas semanas de prática',description:'Estude em 14 dias diferentes.',metric:'days',goal:14,icon:'leaf'},
 {id:'reviews100',name:'Memória afiada',description:'Registre 100 revisões.',metric:'reviews',goal:100,icon:'cards'},
 {id:'quiz10',name:'Explorador de ideias',description:'Conclua 10 quizzes.',metric:'quizzes',goal:10,icon:'sparkles'},
 {id:'hours10',name:'Tempo bem investido',description:'Acumule 10 horas de foco.',metric:'minutes',goal:600,icon:'book'},
 {id:'days60',name:'Horizonte amplo',description:'Estude em 60 dias diferentes.',metric:'days',goal:60,icon:'sun'},
 {id:'tasks100',name:'Realizador',description:'Conclua 100 tarefas.',metric:'tasks',goal:100,icon:'check'},
 {id:'reviews250',name:'Conhecimento vivo',description:'Registre 250 revisões.',metric:'reviews',goal:250,icon:'star'},
 {id:'quiz25',name:'Sempre curioso',description:'Conclua 25 quizzes.',metric:'quizzes',goal:25,icon:'target'},
] as const;
export type Cosmetic={id:string;name:string;value:string;unlock?:string};
export const cosmetics:Record<"border"|"cover"|"title",Cosmetic[]> = {
 border:[{id:'plain',name:'Lavanda',value:'#9878ff'},{id:'ocean',name:'Oceano',value:'#4c9ca8'},{id:'sprout',name:'Broto',value:'#57a875',unlock:'sprout'},{id:'tasks',name:'Checklist',value:'#dc9b39',unlock:'tasks'},{id:'stars',name:'Constelação',value:'#b58aff',unlock:'stars'}],
 cover:[{id:'lavender',name:'Lavanda',value:'linear-gradient(125deg,#53418b,#a995e8)'},{id:'sea',name:'Mar tranquilo',value:'linear-gradient(125deg,#205666,#83c9c0)'},{id:'sunrise',name:'Amanhecer',value:'linear-gradient(125deg,#753f7b,#f5b079)',unlock:'sunrise'},{id:'library',name:'Biblioteca',value:'repeating-linear-gradient(90deg,#765347 0 18px,#b58c66 18px 25px,#49374f 25px 48px)',unlock:'library'},{id:'night',name:'Céu noturno',value:'radial-gradient(circle at 25% 25%,#dcd2ff 1px,transparent 2px) 0 0/25px 25px,#28204c',unlock:'stars'}],
 title:[{id:'student',name:'Estudante',value:'Estudante'},{id:'focus',name:'Um passo por vez',value:'Um passo por vez',unlock:'focus'},{id:'memory',name:'Mente em treino',value:'Mente em treino',unlock:'memory'},{id:'quiz',name:'Mente curiosa',value:'Mente curiosa',unlock:'quiz'},{id:'reader',name:'Sempre aprendendo',value:'Sempre aprendendo',unlock:'reader'}]
};
cosmetics.border.push({id:'v0',name:'Aurora',value:'#49baab',unlock:'tasks50'});
cosmetics.cover.push({id:'v0',name:'Aurora',value:'linear-gradient(30deg, #49baab, #519dc8 45%, #28233f)',unlock:'tasks50'});
cosmetics.title.push({id:'v0',name:'Organizo meu amanhã',value:'Organizo meu amanhã',unlock:'tasks50'});
cosmetics.border.push({id:'v1',name:'Cristal',value:'#76b4ee',unlock:'focus25'});
cosmetics.cover.push({id:'v1',name:'Cristal',value:'radial-gradient(circle at 20% 30%, #76b4ee, #da84b3 45%, #28233f)',unlock:'focus25'});
cosmetics.title.push({id:'v1',name:'Foco em movimento',value:'Foco em movimento',unlock:'focus25'});
cosmetics.border.push({id:'v2',name:'Chamas',value:'#ed8854',unlock:'days14'});
cosmetics.cover.push({id:'v2',name:'Chamas',value:'linear-gradient(64deg, #ed8854, #a38ce0 45%, #28233f)',unlock:'days14'});
cosmetics.title.push({id:'v2',name:'Aprender é crescer',value:'Aprender é crescer',unlock:'days14'});
cosmetics.border.push({id:'v3',name:'Ondas',value:'#519dc8',unlock:'reviews100'});
cosmetics.cover.push({id:'v3',name:'Ondas',value:'radial-gradient(circle at 20% 30%, #519dc8, #6aaa90 45%, #28233f)',unlock:'reviews100'});
cosmetics.title.push({id:'v3',name:'Memória afiada',value:'Memória afiada',unlock:'reviews100'});
cosmetics.border.push({id:'v4',name:'Sakura',value:'#da84b3',unlock:'quiz10'});
cosmetics.cover.push({id:'v4',name:'Sakura',value:'linear-gradient(98deg, #da84b3, #c39af3 45%, #28233f)',unlock:'quiz10'});
cosmetics.title.push({id:'v4',name:'Explorador de ideias',value:'Explorador de ideias',unlock:'quiz10'});
cosmetics.border.push({id:'v5',name:'Eclipse',value:'#a38ce0',unlock:'hours10'});
cosmetics.cover.push({id:'v5',name:'Eclipse',value:'radial-gradient(circle at 20% 30%, #a38ce0, #b0aa55 45%, #28233f)',unlock:'hours10'});
cosmetics.title.push({id:'v5',name:'Tempo bem investido',value:'Tempo bem investido',unlock:'hours10'});
cosmetics.border.push({id:'v6',name:'Circuito',value:'#6aaa90',unlock:'days60'});
cosmetics.cover.push({id:'v6',name:'Circuito',value:'linear-gradient(132deg, #6aaa90, #d783c5 45%, #28233f)',unlock:'days60'});
cosmetics.title.push({id:'v6',name:'Além do horizonte',value:'Além do horizonte',unlock:'days60'});
cosmetics.border.push({id:'v7',name:'Cometa',value:'#c39af3',unlock:'tasks100'});
cosmetics.cover.push({id:'v7',name:'Cometa',value:'radial-gradient(circle at 20% 30%, #c39af3, #49baab 45%, #28233f)',unlock:'tasks100'});
cosmetics.title.push({id:'v7',name:'Faço acontecer',value:'Faço acontecer',unlock:'tasks100'});
cosmetics.border.push({id:'v8',name:'Laurel',value:'#b0aa55',unlock:'reviews250'});
cosmetics.cover.push({id:'v8',name:'Laurel',value:'linear-gradient(166deg, #b0aa55, #76b4ee 45%, #28233f)',unlock:'reviews250'});
cosmetics.title.push({id:'v8',name:'Conhecimento vivo',value:'Conhecimento vivo',unlock:'reviews250'});
cosmetics.border.push({id:'v9',name:'Prisma',value:'#d783c5',unlock:'quiz25'});
cosmetics.cover.push({id:'v9',name:'Prisma',value:'radial-gradient(circle at 20% 30%, #d783c5, #ed8854 45%, #28233f)',unlock:'quiz25'});
cosmetics.title.push({id:'v9',name:'Sempre curioso',value:'Sempre curioso',unlock:'quiz25'});
cosmetics.border.push({id:'plus-keepsake',name:'Órbita Estudaí+',value:'#eab65e',unlock:'plus-keepsake'});
cosmetics.cover.push({id:'plus-keepsake',name:'Legado Estudaí+',value:'radial-gradient(ellipse at 75% 20%,#f5d38c,transparent 35%),linear-gradient(135deg,#332453,#835bb1,#c29a62)',unlock:'plus-keepsake'});
cosmetics.title.push({id:'plus-keepsake',name:'Parte dessa história',value:'Parte dessa história',unlock:'plus-keepsake'});
export type Look={avatar:string;photo:string;coverImage:string;customTitle:string;nameFont:string;border:string;cover:string;title:string;bio:string;medals:string[]};
export type Rewards={look:Look;unlocked:Record<string,string>;tasks:string[];sessions:Record<string,number>;reviews:Record<string,number>;quizzes:string[];days:string[]};
export const emptyRewards=():Rewards=>({look:{avatar:'initial',photo:'',coverImage:'',customTitle:'',nameFont:'sans',border:'plain',cover:'lavender',title:'student',bio:'',medals:[]},unlocked:{},tasks:[],sessions:{},reviews:{},quizzes:[],days:[]});
export function normalizeRewards(value?:Rewards):Rewards {
 const base=emptyRewards();if(!value||typeof value!=='object')return base;
 return {...base,...value,look:{...base.look,...value.look,medals:Array.isArray(value.look?.medals)?value.look.medals.slice(0,3):[]},tasks:Array.isArray(value.tasks)?value.tasks:[],quizzes:Array.isArray(value.quizzes)?value.quizzes:[],days:Array.isArray(value.days)?value.days:[],sessions:value.sessions||{},reviews:value.reviews||{},unlocked:value.unlocked||{}};
}
export function rewardStats(r:Rewards){return {tasks:r.tasks.length,sessions:Object.keys(r.sessions).length,reviews:Object.values(r.reviews).reduce((a,b)=>a+b,0),minutes:Object.values(r.sessions).reduce((a,b)=>a+b,0),quizzes:r.quizzes.length,days:r.days.length};}
export function reconcileRewards(state:State):State {
 if(!state.profile)return {...state,rewards:normalizeRewards(state.rewards)};
 const r=normalizeRewards(state.rewards);const days=new Set(r.days);const sessions={...r.sessions},reviews={...r.reviews};
 const addDay=(v?:string)=>{if(v&&/^\d{4}-\d{2}-\d{2}/.test(v))days.add(v.slice(0,10));};
 for(const s of state.collections.sessions){if((s.duration||0)>0){sessions[s.id]=Math.max(sessions[s.id]||0,s.duration||0);addDay(s.date);}}
 for(const c of state.collections.cards){if((c.reviews||0)>0){reviews[c.id]=Math.max(reviews[c.id]||0,c.reviews||0);addDay(c.reviewedAt);}}
 const quizzes=state.quiz.attempts.filter(a=>a.finished);for(const q of quizzes)addDay(q.createdAt);
 const next:Rewards={...r,sessions,reviews,days:[...days],tasks:[...new Set([...r.tasks,...state.collections.tasks.filter(t=>t.completed).map(t=>t.id)])],quizzes:[...new Set([...r.quizzes,...quizzes.map(q=>q.id)])],unlocked:{...r.unlocked}};
 if(state.plan==='plus'&&!next.unlocked['plus-keepsake'])next.unlocked['plus-keepsake']=new Date().toISOString();
 const stats=rewardStats(next);for(const m of milestones)if(stats[m.metric]>=m.goal&&!next.unlocked[m.id])next.unlocked[m.id]=new Date().toISOString();
 return {...state,rewards:next};
}
export function available(item:{id:string;unlock?:string},r:Rewards){return !item.unlock||!!r.unlocked[item.unlock];}
