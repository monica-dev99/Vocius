import "styles/globals.css";

import Nav from 'components/Nav';
import Provider from '/components/Provider';


export const metadata={
    title: "Vocius",
    description:'Discover & Share AI Prompts'
}

const RootLayout = ({children}) => {
  return  (  
    <html lang="en">
        <body>
            <Provider>
             
                <Nav />
            {children}
            
            </Provider>
        </body>
    </html>
 )
}

export default RootLayout;