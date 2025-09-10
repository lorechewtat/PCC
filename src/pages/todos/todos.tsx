import { BooleanInput, Create, DataTable, Edit, EditButton, List, ReferenceField, ReferenceInput, SimpleForm, TextInput, useRecordContext } from "react-admin"

const TodoFilt=[
    <TextInput label= "Search" source= "q" alwaysOn/>,
    <BooleanInput label= "Complete" source="completed"/>
]

// Componente para mostrar si el estado (completo o no)
const IsCompleted = () => {
  const record = useRecordContext();

  return (
    <span
      style={{
        color: record?.completed ? "DarkBlue" : "Tomato",
        fontWeight: "bold",
      }}
    >
      {record?.completed ? "Completed" : "Missing"}
    </span>
  );
};

export const Todolist = () => (
    <List filters={TodoFilt}>
        <DataTable>
            <DataTable.Col source="id"/>
            <DataTable.Col source="userId">
                <ReferenceField source="userId" reference="users"/>
            </DataTable.Col>
            <DataTable.Col source="title"/>

            <DataTable.Col source="completed">
                <IsCompleted />
            </DataTable.Col>

            <DataTable.Col>
                <EditButton/>
            </DataTable.Col>

        </DataTable>

    </List>)


export const TodoCreate  = () => (

    <Create>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
             </ReferenceInput>
             <TextInput required source="id"/>
             <TextInput required source="title"/>   
             <BooleanInput source="completed"/>
            
            
        </SimpleForm>
    </Create>
)


export const TodoEdit  = () => (

    <Edit>
        <SimpleForm>
            <ReferenceInput disable source="userId" reference="users">
             </ReferenceInput>
             <TextInput disabled source="id"/>
             <TextInput  source="title"/>   
             <BooleanInput source="completed"/>
            
            
        </SimpleForm>
    </Edit>
)
