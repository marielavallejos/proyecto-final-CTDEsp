import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    label:string;
}

interface BasicTabsProps {
    children: React.ReactNode;
}

export function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, label, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <div>
            {children}
          </div>
        )}
      </div>
    );
  }
  

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs({ children }: BasicTabsProps) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const tabLabels: string[] = [];
    const tabContents: React.ReactNode[] = [];

    React.Children.forEach(children, (child, index) => {
        if (React.isValidElement(child)) {
            if (child.type === CustomTabPanel) {
                tabLabels.push(child.props.label);
                tabContents.push(child.props.children);
            }
        }
    });

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        {tabLabels.map((label, index) => (
                            <Tab label={label} {...a11yProps(index)} key={index} />

                        ))}
                    </Tabs>
                </Box>
            </Box>
            {tabContents.map((content, index) => (
                <CustomTabPanel value={value} index={index} key={index} label=''>
                    {content}
                </CustomTabPanel>
            ))}
        </div>
    );
}
