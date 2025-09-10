// App.tsx
import {
  Admin,
  EditGuesser,
  Resource,
  ShowGuesser,
  CustomRoutes,
} from "react-admin";
import { Route } from "react-router-dom";

// Tu formulario personalizado

// Otros imports
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import TodoIcon from "@mui/icons-material/Checklist";
import CommentIcon from "@mui/icons-material/Comment";
import AlbumIcon from "@mui/icons-material/PhotoAlbum";
import PhotoIcon from "@mui/icons-material/Photo";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import PostList from "./pages/posts/post-list";
import UserList from "./pages/users/user-list";
import PostShow from "./pages/posts/post-show";
import UserShow from "./pages/users/user-show";
import PostCreate from "./pages/posts/post-create";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { authProvider } from "./authprovider";
import { i18nProvider } from "./consts/translates/i18nProvider";
import { TodoCreate, TodoEdit, Todolist } from "./pages/todos/todos";
import { PhotoCreate, PhotoEdit, PhotoList } from "./pages/photo/photo";
import {
  CommentsCreate,
  CommentsEdit,
  CommentsList,
} from "./pages/comments/comments";
import {
  AlbumCreate,
  AlbumEdit,
  AlbumList,
} from "./pages/albums/albums";
import MyLoginPage from "./pages/login/login_screen";
import myTheme from "./consts/theme";
import MyCustomFormPage from "./pages/custom_form/custom_form";
import MyCustomEdadFormPage from "./pages/custom_form/ejemplo_edad";


export const App = () => (
  <Admin
    loginPage={MyLoginPage}
    theme={myTheme}
    authProvider={authProvider}
    layout={Layout}
    dataProvider={dataProvider}
    i18nProvider = {i18nProvider}
    dashboard={MyCustomFormPage}
  
  >
    <Resource
      name="posts"
      list={MyCustomEdadFormPage}
      show={MyCustomEdadFormPage}
      edit={MyCustomEdadFormPage}
      create={MyCustomEdadFormPage}
      icon={PostIcon}
    />
    <Resource name="users" list={UserList} show={UserShow} icon={UserIcon} />
    <Resource
      name="todos"
      list={Todolist}
      create={TodoCreate}
      edit={TodoEdit}
      icon={TodoIcon}
    />
    <Resource
      name="comments"
      list={CommentsList}
      create={CommentsCreate}
      edit={CommentsEdit}
      icon={CommentIcon}
    />
    <Resource
      name="albums"
      list={AlbumList}
      create={AlbumCreate}
      edit={AlbumEdit}
      icon={AlbumIcon}
    />
    <Resource
      name="photos"
      list={PhotoList}
      create={PhotoCreate}
      edit={PhotoEdit}
      icon={PhotoIcon}
    />

    {/* ✅ Ruta personalizada */}
    <CustomRoutes>
      <Route path="/custom-form" element={<MyCustomFormPage />} />
      <Route path="/ejemplo-edad" element={<MyCustomEdadFormPage />} />
    </CustomRoutes>
  </Admin>
);
