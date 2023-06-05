export function errorsFirebase(error) {
    switch (error) {
      case 'auth/invalid-email':
        return 'O e-mail inserido é inválido';
      case 'auth/user-not-found':
        return 'O e-mail inserido não está cadastrado';
      case 'auth/email-already-in-use':
        return 'O e-mail inserido já possui cadastro';
      case 'auth/weak-password':
        return 'A senha deve ter 6 ou mais caracteres';
      case 'auth/invalid-password':
        return 'Senha inválida';
      case 'auth/wrong-password':
        return 'Senha incorreta';
      default:
        return '';
    }
  }

export function validateRegister(name, sobrenome, password) {
    if (!name && !sobrenome && !password) {
      return 'Preencha todos os campos';
    }
  
    if (name === '') {
      return 'Insira um nome';
    }
    if (sobrenome === '') {
      return 'Insira um sobrenome';
    } 
    if (password === '') {
      return 'Digite sua senha';
    }
  
    return '';
  }