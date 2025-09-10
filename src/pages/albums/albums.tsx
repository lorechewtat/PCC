import { BooleanField, BooleanInput, Create, DataTable, Edit, EditButton, List, ReferenceField, ReferenceInput, SimpleForm, TextInput, UrlField,  } from "react-admin"

export const AlbumList = () => (
   <List>
        <DataTable>
            <DataTable.Col source="id"/>
            <DataTable.Col source="userId">
                <ReferenceField source="userId" reference="users"/>
            </DataTable.Col>
            <DataTable.Col source="title"/>

            <DataTable.Col>
                <EditButton/>
            </DataTable.Col>

        </DataTable>
</List>
    )


export const AlbumCreate  = () => (

    <Create>
        <SimpleForm>
          
             <TextInput required source="id"/>
               <ReferenceInput source="userId" reference="users">
             </ReferenceInput>
             <TextInput required source="title"/>   
             <TextInput required source="body" multiline rows={5} />
            
            
        </SimpleForm>
    </Create>
)


export const AlbumEdit  = () => (

    <Edit>
        <SimpleForm>

             <TextInput disabled source="id"/>
                       
            <ReferenceInput disabled source="userId" reference="users">
             </ReferenceInput>
             <TextInput  source="title"/>   
              <TextInput  source="body"/>   
           
        </SimpleForm>
    </Edit>
)
