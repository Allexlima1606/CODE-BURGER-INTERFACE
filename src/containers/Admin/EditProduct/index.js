import React, { useEffect, useState } from 'react'
import ReactSelect from 'react-select'
import { useForm, Controller } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import * as Yup from 'yup'

import api from '../../../services/api'
import {
  Container,
  Label,
  Input,
  ButtonStyles,
  LabelUpload,
  ContainerInput
} from './styles'

import { ErrorMessage } from '../../../components'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

export function EditProduct() {
  const [fileName, setFileName] = useState(null)
  const [categories, setCategories] = useState([])
  const {
    push,
    location: {
      state: { product }
    }
  } = useHistory()

  console.log(product)

  const schema = Yup.object().shape({
    name: Yup.string().required('Digite o nome do produto'),
    price: Yup.string().required('Digite o preço do produto'),
    category: Yup.object().required('escolha uma categoria'),
    offer: Yup.bool()
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  const onSubmit = async data => {
    const productDataformData = new FormData()

    productDataformData.append('name', data.name)
    productDataformData.append('price', data.price)
    productDataformData.append('category_id', data.category.id)
    productDataformData.append('file', data.file[0])
    productDataformData.append('offer', data.offer)

    await toast.promise(
      api.post(`products/${product.id}`, productDataformData),
      {
        pending: 'Editando novo produto...',
        success: 'Produto editado com sucesso',
        error: 'Falha ao editar o produto'
      }
    )
    setTimeout(() => {
      push('/listar-produtos')
    }, 2000)
  }

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('categories')
      setCategories(data)
    }
    loadCategories()
  }, [])

  return (
    <Container>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Name</Label>
          <Input
            type="text"
            {...register('name')}
            defaultValue={product.name}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>

        <div>
          <Label>Preço</Label>
          <Input
            type="number"
            {...register('price')}
            defaultValue={product.price}
          />
          <ErrorMessage>{errors.price?.message}</ErrorMessage>
        </div>

        <div>
          <LabelUpload>
            {fileName || (
              <>
                <CloudUploadIcon />
                Carregue a Imagem do Produto
              </>
            )}
            <input
              type="file"
              id="image-input"
              accept="image/png, image/jpeg"
              {...register('file')}
              onChange={value => {
                setFileName(value.target.files[0]?.name)
              }}
            />
          </LabelUpload>
          <ErrorMessage>{errors.file?.message}</ErrorMessage>
        </div>

        <div>
          <Controller
            name="category"
            control={control}
            defaultValue={product.category}
            render={({ field }) => {
              return (
                <ReactSelect
                  {...field}
                  options={categories}
                  getOptionLabel={cat => cat.name}
                  getOptionValue={cat => cat.id}
                  placeholder="Selecione uma Categoria"
                  defaultValue={product.category}
                />
              )
            }}
          ></Controller>
          <ErrorMessage>{errors.category?.message}</ErrorMessage>
        </div>

        <ContainerInput>
          <input
            type="checkbox"
            {...register('offer')}
            defaultChecked={product.offer}
          />
          <label>Produto em oferta? </label>
        </ContainerInput>

        <ButtonStyles>Editar Produto</ButtonStyles>
      </form>
    </Container>
  )
}

export default EditProduct
