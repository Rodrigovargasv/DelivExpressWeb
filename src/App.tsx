import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import logoCadastro from './assets/lista-de-tarefas.png'
import axios from 'axios';



interface FormValues {
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  imageUrl: string;

}

interface FormErrors {
  nome: string;
  descricao: string;
  preco: string;
  estoque: string;
  imageUrl: string;
}

interface FormProduct {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  imageUrl: string;
}
function App() {

  const [produtos, setDate] = useState<any[]>([{}])
  const [modalIncluir, setIsOpen] = useState(false)
  const [modalEditar, setIsOpenModal] = useState(false)
  const [modalDelete, setIsDeletenModal] = useState(false)

  const [formValues, setFormValues] = useState<FormValues>({
    nome: '',
    descricao: '',
    preco: 0,
    estoque: 0,
    imageUrl: ''
  });
  const [formValuesEditar, setFormValuesEditar] = useState<FormProduct>({
    id: 0,
    nome: '',
    descricao: '',
    preco: 0,
    estoque: 0,
    imageUrl: ''
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    nome: '',
    descricao: '',
    preco: '',
    estoque: '',
    imageUrl: ''
  });


  function ProductGetById(productId: number) {

    axios.get(`http://localhost:5155/api/Produtos/${productId}`)
      .then(response => {
        // Sucesso na requisição
        const product = response.data;
        setFormValuesEditar(product)

      })
      .catch(error => {
        // Erro na requisição
        console.error('Erro ao buscar o produto:', error);
      });

  }

  // busca por todos os produtos
  function GetAllProducts() {

    useEffect(() => {
      const fetchProdutos = async () => {
        try {
          const response = await axios.get("http://localhost:5155/api/Produtos");
          const fetchedData = response.data;
          console.log(fetchedData)
          setDate(fetchedData);
        } catch (error) {
          console.log(error);
        }
      };

      fetchProdutos();
    }, []);
  }
  GetAllProducts();


  // cria um novo produto
  const productCreate = async () => {

    const errors: FormErrors = {
      nome: '',
      descricao: '',
      preco: '',
      estoque: '',
      imageUrl: ''
    };


    if (formValues.nome === '') {
      errors.nome = 'O campo nome é obrigatório.';
      setFormErrors(errors);

    }
    else if (formValues.nome.length < 3) {
      errors.nome = 'O campo nome deve ter no mínimo 3 caracteres.'
      setFormErrors(errors);

    }
    if (formValues.descricao === '') {
      errors.descricao = 'O campo descrição é obrigatório.'
      setFormErrors(errors);


    }
    if (formValues.estoque.toString() === '') {
      errors.estoque = 'O campo nome é obrigatório.';
      setFormErrors(errors);


    }
    if (formValues.preco < 0) {
      errors.preco = 'Valor do campo não pode ser menor que zero'
      setFormErrors(errors);


    }
    if (formValues.imageUrl === '') {
      errors.imageUrl = 'O campo imageUrl é obrigatório.'
      setFormErrors(errors);

    }
    else if (formValues.imageUrl.length < 5) {
      errors.imageUrl = 'O campo imageUrl deve ter no mínimo 5 caracteres.'
      setFormErrors(errors);
    }
    else {
      setFormErrors(errors)
      var verfica = Object.values(errors).some(value => value !== '')
      if (!verfica) {
        console.log(formValues)
        await axios.post('http://localhost:5155/api/Produtos', formValues);
        handleCloseFormAdd()

      }

    }

  }

  // atuliza um produtos
  const productUpdate = async () => {


    const errors: FormErrors = {
      nome: '',
      descricao: '',
      preco: '',
      estoque: '',
      imageUrl: ''
    };


    if (formValuesEditar.nome === '') {
      errors.nome = 'O campo nome é obrigatório.';
      setFormErrors(errors);

    }
    else if (formValuesEditar.nome.length < 3) {
      errors.nome = 'O campo nome deve ter no mínimo 3 caracteres.'
      setFormErrors(errors);

    }
    if (formValuesEditar.descricao === '') {
      errors.descricao = 'O campo descrição é obrigatório.'
      setFormErrors(errors);


    }
    if (formValuesEditar.estoque.toString() === '') {
      errors.estoque = 'O campo nome é obrigatório.';
      setFormErrors(errors);


    }
    if (formValuesEditar.preco < 0) {
      errors.preco = 'Valor do campo não pode ser menor que zero'
      setFormErrors(errors);


    }
    if (formValuesEditar.imageUrl === '') {
      errors.imageUrl = 'O campo imageUrl é obrigatório.'
      setFormErrors(errors);

    }
    else if (formValuesEditar.imageUrl.length < 5) {
      errors.imageUrl = 'O campo imageUrl deve ter no mínimo 5 caracteres.'
      setFormErrors(errors);
    }
    else {
      setFormErrors(errors)
      var verfica = Object.values(errors).some(value => value !== '')
      if (!verfica) {
        axios.put(`http://localhost:5155/api/Produtos/${formValuesEditar.id}`, formValuesEditar)
        handleCloseFormEdit();

      }
    };
  }

  const productDelete = async () => {
    axios.delete(`http://localhost:5155/api/Produtos/${formValuesEditar.id}`)
    handleFormDeleteClose()
    
    
  }
  // abre o formulário de inclusão de produtos
  const handleOpenFormAdd = () => {
    setIsOpen(true);
  };

  // fecha o formulário de inclusão de produtos
  const handleCloseFormAdd = () => {
    setIsOpen(false)
    window.location.reload();
  };

  // abre o formulário de edição
  const handleOpenFormEdit = (productId: number) => {
    ProductGetById(productId);
    setIsOpenModal(true);
  };


  // fecha o formulário de edição
  const handleCloseFormEdit = () => {
    setIsOpenModal(false)
    window.location.reload();
  };

  const handleFormDelete = (productId: number) => {
    ProductGetById(productId);
    setIsDeletenModal(true)
  } 
  const handleFormDeleteClose = () => {
    setIsDeletenModal(false)
    window.location.reload();
  }


  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };
  const handleChangeEdit = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormValuesEditar((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };


  return (
    <div className="container">

      <div className="content">
        <h2>Cadastro de Produto</h2>
        <header className='header-container'>
          <img src={logoCadastro} className='logo' />
          <button className="btn btn-success btn-incluir" onClick={handleOpenFormAdd}>Incluir</button>
        </header>
        <table className="table">
          <thead className="table table-success ">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NOME</th>
              <th scope="col">PREÇO</th>
              <th scope="col">ESTOQUE</th>
              <th style={{ textAlign: 'center' }} scope="col" >OPERAÇÃO</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((prod) => (
              <tr key={prod.id}>
                <th scope="row">{prod.id}</th>
                <td className="col-7">{prod.nome}</td>
                <td className='col-2'>{prod.preco}</td>
                <td className='col-10'>{prod.estoque}</td>
                <td>
                  <div className="button-container">
                    <button className='btn btn-primary' onClick={() => handleOpenFormEdit(prod.id)}>Editar</button>
                    <button className='btn btn-danger' onClick={() => handleFormDelete(prod.id)}>Excluir</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal isOpen={modalIncluir}>
          <ModalHeader>Incluir Produto</ModalHeader>
          <ModalBody>

            <form className="form-group">

              <label>Nome: </label>
              <br />
              <input type="text" className="form-control" name="nome" value={formValues.nome} onChange={handleChange} required />
              {formErrors.nome && <span className="error-message">{formErrors.nome}</span>}
              <br />
              <label>Descriçao: </label>
              <br />
              <input type="text" className="form-control" name="descricao" value={formValues.descricao} onChange={handleChange} />
              {formErrors.descricao && <span className="error-message">{formErrors.descricao}</span>}
              <br />
              <label>Preço: </label>
              <br />
              <input type="number" className="form-control" name="preco" value={formValues.preco} onChange={handleChange} />
              {formErrors.preco && <span className="error-message">{formErrors.preco}</span>}
              <br />
              <label>Estoque: </label>
              <br />
              <input type="number" className="form-control" name="estoque" value={formValues.estoque} onChange={handleChange} />
              {formErrors.estoque && <span className="error-message">{formErrors.estoque}</span>}
              <br />
              <label>Image: </label>
              <br />
              <input type="text" className="form-control" name="imageUrl" value={formValues.imageUrl} onChange={handleChange} />
              {formErrors.imageUrl && <span className="error-message">{formErrors.imageUrl}</span>}
              <br />
            </form>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={productCreate}>Incluir</button>{"   "}
            <button className="btn btn-danger" onClick={handleCloseFormAdd} >Cancelar</button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalEditar}>
          <ModalHeader>Editar Produto</ModalHeader>
          <ModalBody>

            <form className="form-group">

              <label>ID: </label>
              <br />
              <input className="form-control form-control-plaintext bg-light " readOnly value={formValuesEditar.id} />
              <br />
              <label>Nome: </label>
              <br />
              <input type="text" className="form-control" name='nome' value={formValuesEditar.nome} onChange={handleChangeEdit} />
              {formErrors.nome && <span className="error-message">{formErrors.nome}</span>}
              <br />
              <label>Descriçao: </label>
              <br />
              <input type="text" className="form-control" name="descricao" value={formValuesEditar.descricao} onChange={handleChangeEdit} />
              {formErrors.descricao && <span className="error-message">{formErrors.descricao}</span>}
              <br />
              <label>Preço: </label>
              <br />
              <input type="number" className="form-control" name="preco" value={formValuesEditar.preco} onChange={handleChangeEdit} />
              {formErrors.preco && <span className="error-message">{formErrors.preco}</span>}
              <br />
              <label>Estoque: </label>
              <br />
              <input type="number" className="form-control" name="estoque" value={formValuesEditar.estoque} onChange={handleChangeEdit} />
              {formErrors.estoque && <span className="error-message">{formErrors.estoque}</span>}
              <br />
              <label>Image: </label>
              <br />
              <input type="text" className="form-control" name="imageUrl" value={formValuesEditar.imageUrl} onChange={handleChangeEdit} />
              {formErrors.imageUrl && <span className="error-message">{formErrors.imageUrl}</span>}
              <br />
            </form>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={productUpdate}>Incluir</button>
            <button className="btn btn-danger" onClick={handleCloseFormEdit} >Cancelar</button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={modalDelete}>
          <ModalBody>
            
              <p className="text-center" style={{ fontWeight: 'bold', fontSize: '16px' }}>Tem certeza que deseja excluir o produto?</p>
          
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={productDelete}>Excluir</button>
            <button className="btn btn-secondary" onClick={handleFormDeleteClose}>Cancelar</button>
          </ModalFooter>
        </Modal>

      </div>
    </div>
  )
}

export default App;