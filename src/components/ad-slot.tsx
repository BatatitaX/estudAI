"use client";
import {useStore} from "./provider";
/** Espaço reservado para uma futura unidade manual do Google AdSense.
 * Não carrega scripts, cookies ou anúncios reais nesta versão.
 * Cada placement deve ser associado ao ID real de uma unidade na integração.
 */
export function AdSlot({placement,format='banner',wide=false}:{placement:string;format?:'banner'|'rectangle';wide?:boolean}) {
 const {state,ready}=useStore();
 if(!ready||state.plan==='plus')return null;
 return <aside className={`ad-slot ad-slot-${format}${wide?' ad-slot-wide':''}`} aria-label="Publicidade" data-ad-placement={placement}>
   <span className="ad-slot-label">Publicidade</span>
   <div className="ad-slot-space" aria-hidden="true" />
 </aside>;
}
