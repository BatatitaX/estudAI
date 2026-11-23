import { Icon } from './ui';
import { milestones } from '@/lib/rewards';
export function AvatarDecoration({id}:{id:string}) {
 return <svg className={`avatar-decoration decoration-${id}`} viewBox="0 0 140 140" fill="none" aria-hidden="true">
 {id.startsWith('v')&&Array.from({length:5+Number(id.slice(1))%6},(_,i)=>{const variant=Number(id.slice(1));const count=5+variant%6;return <g key={i} transform={`rotate(${i*360/count+variant*9} 70 70)`}>{variant%4===0?<path d="M70 2Q88 16 70 30Q52 16 70 2Z" fill="currentColor" opacity=".85"/>:variant%4===1?<path d="m70 0 10 17-10 12-10-12Z" fill="currentColor" stroke="#ffffffaa"/>:variant%4===2?<path d="M62 24Q52 10 70 0Q66 13 80 14Q86 29 70 30Z" fill="currentColor"/>:<><circle cx="70" cy="10" r="8" stroke="currentColor" strokeWidth="3"/><path d="M70 18v12" stroke="currentColor" strokeWidth="2"/></>}</g>;})}
 {id==='plus-keepsake'&&<><ellipse cx="70" cy="70" rx="67" ry="36" transform="rotate(-30 70 70)" stroke="currentColor" strokeWidth="3"/><path d="m50 18-5-16 17 8 8-10 8 10 17-8-5 16Z" fill="#efc878"/><path d="m112 91 3 9 10 3-10 3-3 9-3-9-9-3 9-3Z" fill="#ffe7ae"/></>}
 <circle cx="70" cy="70" r="49" stroke="currentColor" strokeWidth="3"/>
 {id==='plain'&&<><path d="m108 20 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" fill="currentColor"/><circle cx="23" cy="104" r="5" fill="currentColor"/></>}
 {id==='ocean'&&<><ellipse cx="70" cy="70" rx="67" ry="29" transform="rotate(-32 70 70)" stroke="currentColor" strokeWidth="4"/><circle cx="13" cy="83" r="7" fill="#9ce6e3"/><circle cx="114" cy="29" r="9" fill="currentColor"/></>}
 {id==='sprout'&&<><path d="M30 116C6 87 13 49 34 22M110 116C134 87 127 49 106 22" stroke="currentColor" strokeWidth="4"/>{[0,1,2].map(i=><g key={i} transform={`translate(0 ${i*23})`}><path d="M23 48C4 46 3 29 4 24C24 25 30 35 23 48Z" fill="#6cbd8e"/><path d="M117 48C136 46 137 29 136 24C116 25 110 35 117 48Z" fill="#a4df9b"/></g>)}</>}
 {id==='tasks'&&<><path d="m41 112-8 25 20-7 10 7 7-21 7 21 10-7 20 7-8-25" fill="#de9353"/><path d="m56 17 5-13 9 7 9-7 5 13" fill="#ffd67c"/><path d="m59 119 8 8 15-17" stroke="#fff0bb" strokeWidth="5" strokeLinecap="round"/></>}
 {id==='stars'&&<><path d="M9 94 27 24 110 13 129 84 91 129" stroke="#bca1fb" strokeWidth="1.5"/>{[[27,24],[110,13],[129,84],[91,129],[9,94]].map(([x,y],i)=><path key={i} d={`M${x} ${y-9}l3 6 6 3-6 3-3 6-3-6-6-3 6-3Z`} fill={i%2?'#ffe5a5':'#c8b3ff'}/>)}</>}
 </svg>;
}
export function AchievementMedal({id}:{id:string}){
 const m=milestones.find(m=>m.id===id);if(!m)return null;
 return <span className={`achievement-medal medal-${id}`} style={{"--medal-light": `hsl(${milestones.findIndex(x=>x.id===id)*37%360} 75% 80%)`,"--medal-dark": `hsl(${milestones.findIndex(x=>x.id===id)*37%360} 45% 45%)`} as React.CSSProperties} aria-hidden="true"><span className="medal-ribbons"/><span className="medal-face"><Icon name={m.icon} size={25}/></span><span className="medal-spark">✦</span></span>;
}
