import type { ReactNode } from "react"; 
import { MyMenu } from "./myMenu";
import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin"; 

export const Layout = ({ children }: { children: ReactNode }) => 
  (<RALayout menu={MyMenu}> {children} 
    <CheckForApplicationUpdate /> 
  </RALayout>);