import { List, ListItem, styled } from "@mui/material";


const Skeleton = styled('div')(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: '1px',
    height,
    content: '" "',
  }));


export default function NewsFeed() {
    return (
        <List sx = {{width: '100%', height:600, overflow: 'auto'}}>
            <ListItem sx = {{width: '100%'}}>
                <Skeleton height={100} sx = {{width: '100%'}}/>
            </ListItem>
            <ListItem sx = {{width: '100%'}}>
                <Skeleton height={100} sx = {{width: '100%'}}/>
            </ListItem>
            <ListItem sx = {{width: '100%'}}>
                <Skeleton height={100} sx = {{width: '100%'}}/>
            </ListItem>
            <ListItem sx = {{width: '100%'}}>
                <Skeleton height={100} sx = {{width: '100%'}}/>
            </ListItem>
            <ListItem sx = {{width: '100%'}}>
                <Skeleton height={100} sx = {{width: '100%'}}/>
            </ListItem>
            <ListItem sx = {{width: '100%'}}>
                <Skeleton height={100} sx = {{width: '100%'}}/>
            </ListItem>
            
        </List>
    );
}