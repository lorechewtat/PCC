import { List, DataTable, ReferenceField , EditButton, Edit, 
        SimpleForm, ReferenceInput, TextInput, Create} from "react-admin";

export const CommentsList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="postId">
                <ReferenceField source="postId" reference="posts" />
            </DataTable.Col>
            <DataTable.Col source="name" />
            <DataTable.Col source="email" />
            <DataTable.Col source="body" />
            <DataTable.Col>
                <EditButton />
            </DataTable.Col>
        </DataTable>
    </List>
)

export const CommentsEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id"/>
            <ReferenceInput disabled source="postId" reference="posts">
            </ReferenceInput>
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput source="body" />
        </SimpleForm>
    </Edit>
)

export const CommentsCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput source="postId" reference="posts">
            </ReferenceInput>
            <TextInput required source="name" />
            <TextInput required source="email" />
            <TextInput required source="body" multiline rows={5} />
        </SimpleForm>
    </Create>
)