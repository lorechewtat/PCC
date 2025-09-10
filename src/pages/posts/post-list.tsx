import {Datagrid, List,ReferenceField, TextField, FunctionField, useRecordContext, EditButton, TextInput, ReferenceInput} from "react-admin";
//Componente personalizado para mostrar la lista de posts (Widget donde se muestra la tabla)

const PostPanel = () => {
    const record = useRecordContext();

    return <div>{record?.body}</div>
};
 const PostList = () => {
    const postFilters = [
        <TextInput source="q" label="Search" alwaysOn/>,
        <ReferenceInput source="userId" reference="users" label="User"/>,
    ];
    return(
    <List filters={postFilters}>
        <Datagrid 
        expand={<PostPanel/>}
        sx={{
            '.RaDatagrid-headerCell': {
                backgroundColor: 'lightblue',
                padding: '10px'
              }
        }}>
            //orden descendete muestra las columnas de izquierda a derecha
            
                 <ReferenceField source="userId" reference="users" link="show" />
                <TextField source="id" />
                <TextField source="title" label= "Post Title"/>
                <TextField source="body" />
                <FunctionField label="Excerpt" render={record =>  `${record.body.substring(0, 50)}...`} />
                <ReferenceField source="userId" reference="users" />
                 <EditButton />
        </Datagrid>
    </List>)
 };

export default PostList;