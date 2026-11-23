import {notFound} from "next/navigation";
import {ToolPage} from "@/components/tools";
import {toolsList} from "@/lib/data";
export function generateStaticParams(){return toolsList.map(t=>({slug:t.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return {title:toolsList.find(t=>t.slug===slug)?.title||"Ferramentas"};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!toolsList.some(t=>t.slug===slug))notFound();return <ToolPage slug={slug} embedded/>;}
