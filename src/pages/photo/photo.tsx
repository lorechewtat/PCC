import { BooleanField, BooleanInput, Create, DataTable, Edit, EditButton, ImageField, List, ReferenceField, ReferenceInput, SimpleForm, TextInput, UrlField,  } from "react-admin"

export const PhotoList = () => (
   <List>
        <DataTable>
            <DataTable.Col source="id"/>
            <DataTable.Col source="albumId">
                <ReferenceField source="albumId" reference="albums"/>
            </DataTable.Col>
            <DataTable.Col source="title"/>

            <DataTable.Col source="url">
                <UrlField source="url" />
            </DataTable.Col>
            <DataTable.Col source="thumbnail">
                <ImageField source="thumbnailUrl" />
            </DataTable.Col>
            <DataTable.Col>
                <EditButton/>
            </DataTable.Col>

        </DataTable>
</List>
    )


export const PhotoCreate  = () => (

    <Create>
        <SimpleForm>
            <ReferenceInput source="albumId" reference="albums">
             </ReferenceInput>
             <TextInput required source="name"/>
             <TextInput required source="url"/>   
             <TextInput source="thumbnailUrl" />
            
            
        </SimpleForm>
    </Create>
)


export const PhotoEdit  = () => (

    <Edit>
        <SimpleForm>
          
            <ReferenceInput disabled source="albumId" reference="albums">
             </ReferenceInput>
             <TextInput disabled source="title"/>
             <TextInput  source="url"/>   
             <TextInput source="thumbnailUrl"/>
           
        </SimpleForm>
    </Edit>
)
