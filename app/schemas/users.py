from pydantic import BaseModel, constr, EmailStr


class UserBase(BaseModel):
    first_name: constr(max_length=50)
    last_name: constr(max_length=50)
    city: constr(max_length=100)
    email: EmailStr
    role: constr(max_length=20)


class UserCreate(UserBase):
    password: constr(max_length=100)


class UserUpdate(UserBase):
    password: constr(max_length=100) = None


class UserInDBBase(UserBase):
    id: int

    class Config:
        from_attributes = True


class User(UserInDBBase):
    pass


class UserInDB(UserInDBBase):
    password: constr(max_length=100)
