
import { List, Show, ReferenceField, SimpleShowLayout, TextField } from "react-admin";

 const PostShow = () => (
    <Show>
        <SimpleShowLayout>
            <ReferenceField source="userId" reference="users"/>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="body" />
        </SimpleShowLayout>
    </Show>
);

export default PostShow;