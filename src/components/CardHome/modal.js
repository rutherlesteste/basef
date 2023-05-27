import * as React from "react";
import { Drawer, SIZE, ANCHOR } from "baseui/drawer";

export default ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <Drawer
      isOpen={true}
      autoFocus
      renderAll
      animate={true}
      showBackdrop={isOpen}
      onClose={() => setIsOpen(false)}
      size={isOpen ? SIZE.default : SIZE.auto }
      anchor={ANCHOR.bottom}
      overrides={{



        DrawerContainer: {
            style: ({ $theme }) => ({
            
              borderRadius:'32px',
              display:'flex',
              justfyContent:'center',
              position:'absolute',
              zIndex: 1000000,
              bottom:0,
              marginLeft:'3%',
             
              maxWidth:'95%',

            





            })
          },

          Close: {
            style: ({ $theme }) => ({
              outline: `${$theme.colors.warning600} solid`,
              backgroundColor: $theme.colors.warning600
            })
          },
  

      Root: {
        style: ({ $theme }) => ({
          outline: `${$theme.colors.warning600} solid`,
        })
      },
    
    }}
    >
      {children}
    </Drawer>
  );
};
