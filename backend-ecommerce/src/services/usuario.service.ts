import { Usuario } from "../models/usuario";
import { TipoUsuario } from "../models/tipousuario";
import { Cuenta } from "../models/cuenta";

export async function getUsuario(username: string) {
  const usuario = await Usuario.findByPk(username, {
    attributes: { exclude: ["password"] },
    include: [TipoUsuario, Cuenta],
  });
  if (usuario == null) {
    throw new Error("El usuario no existe");
  }
  return usuario;
}

export async function validateUsuario(username: string, password: string) {
  console.log(username);
  const usuario = await Usuario.findByPk(username, {
    attributes: ["username", "nombre", "password"],
    include: { model: TipoUsuario, attributes: ["codigo"] },
  });
  if (usuario == null) {
    throw new Error("El usuario no existe");
  } else if (password != usuario.password) {
    throw new Error("La password es incorrecta");
  }
  usuario.password = "";
  return usuario;
}

export async function createUsuario(input: any) {
  const verificacionUsuario = await Usuario.findByPk(input.username);
  if (verificacionUsuario != null) {
    throw new Error("Ya existe un usuario con ese username");
  }
  await Usuario.create(input);
  await Cuenta.create({ username: input.username, balance: 0 } as any);
  const usuario = await Usuario.findByPk(input.username, {
    attributes: ["username", "nombre", "password"],
    include: { model: TipoUsuario, attributes: ["codigo"] },
  });
  usuario!.password = "";
  return usuario;
}

export async function cambiarPassword(input: any) {
  const usuario = await Usuario.findByPk(input.username);
  if (usuario == null) {
    throw new Error("El usuario no existe");
  }
  usuario.update({ password: input.password });
  return "Password cambiada exitosamente!";
}
