import { Heading, Image, VStack, Text, type StackProps, HStack, InputGroup, Input, Field, type InputProps, Textarea, type TextareaProps, type HeadingProps, Box, type SelectRootProps, Button, Spacer } from "@chakra-ui/react";
import { newConceptRoute } from "../../../routes/work/ideasRoutes";
import { useEffect, useState, type ChangeEvent } from "react";
import type { AppRoute } from "../../../models/route";
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  fetchCompanies,
} from "../../../store/slices/work/companiesSlice";
import type { Company } from "../../../models/work/company";
import { Portal, Select, createListCollection } from "@chakra-ui/react"

export function NewConceptPage()
{
    const dispatch = useAppDispatch();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [examples, setExamples] = useState("");
    const [useCases, setUseCases] = useState("");
    const [company, setCompany] = useState<string>("");

    const companies = useAppSelector((state) => state.companies.entities);
    const status = useAppSelector((state) => state.companies.status);
    const error = useAppSelector((state) => state.companies.error);

    useEffect(() => {
        if (status === 'idle') {
        dispatch(fetchCompanies());
        }
    }, [status, dispatch]);

    function updateName(event: ChangeEvent<HTMLInputElement>): void {
        setName(event.target.value);
    }

    function updateDescription(event: ChangeEvent<HTMLTextAreaElement>): void {
        setDescription(event.target.value); 
    }

    function updateExamples(event: ChangeEvent<HTMLTextAreaElement>): void {
        setExamples(event.target.value); 
    }
    
    function updateUseCases(event: ChangeEvent<HTMLTextAreaElement>): void {
        setUseCases(event.target.value); 
    }

    const companiesList = Object.values(companies);
    return <>
        <PageWrapper gap="2em">
            <PageHeading route={newConceptRoute}/>
            <VStack gap="1em" maxW="85%" w="100%">
                <NameField value={name} onChange={updateName}/>
                <CompanySelectField value={company} companies={companiesList} onValChange={e => setCompany(e)} />
                <DescriptionField value={description} onChange={updateDescription}/>
                <TextAreaField rows={8} label="Examples" value={examples} onChange={updateExamples}/>
                <TextAreaField rows={8} label="Use Cases" value={useCases} onChange={updateUseCases}/>
            </VStack>
            <HStack w="100%" h="2em">
              <Spacer/>
              <Button>Submit</Button>
              <Button>Improve</Button>
            </HStack>            

        </PageWrapper>

    </>
}

export interface CompanySelectFieldProps extends Omit<SelectRootProps, "collection"|"value"|"onValueChange">
{
    companies:Company[];
    value:string;
    onValChange:(value:string) => void;
}

export function CompanySelectField({companies, value, onValChange,  ...props}:CompanySelectFieldProps)
{
     const [val, setVal] = useState<string[]>([value])
  
    const companiesList = createListCollection({
  items: companies.map((company) => ({
        value: company.uuid,
        label: company.name,
        image: company.image,
    }))});

    return <Field.Root>
        <Field.Label>
         Company
        <Field.RequiredIndicator />
      </Field.Label>
        <Select.Root bg="#00000044"  collection={companiesList} width="320px" value={val} onValueChange={(e) => {setVal(e.value); onValChange(e.value.toString())}} {...props} >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger border="0">
            <HStack gap="1em">
                {val.length > 0 && <Image src={companiesList.find(val[0])?.image} h="2em" w="auto" />}
                <Select.ValueText placeholder="Select a company" />
          </HStack>
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {companiesList.items.map((company) => (
              <Select.Item item={company} key={company.value}>
                <HStack gap="1em">
                    {company.image && <Image src={company.image} h="2em" w="auto" />}
                    {company.label}
                </HStack>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
    </Field.Root>
}

export interface TextFieldProps extends InputProps
{
    label: string;
    required?: boolean;
}

export function NameField(props:Omit<TextFieldProps, 'label'>)
{
    return <TextField label={"Name"} required={true} {...props}/>
}


export function TextField({label, required, ...props}:TextFieldProps)
{
    return <Field.Root required>
      <Field.Label>
        {label} 
        {required && <Field.RequiredIndicator />}
      </Field.Label>
      <Input border="0" type="text" bg="#00000044" {...props}/>
    </Field.Root>
}


export function DescriptionField(props:Omit<TextAreaFieldProps, 'label'>)
{
    return <TextAreaField label={"Description"} {...props}/>
}

export interface TextAreaFieldProps extends TextareaProps
{
    label: string;
    required?: boolean;
}

export function TextAreaField({label, required, ...props}:TextAreaFieldProps)
{
    return <Field.Root required>
      <Field.Label>
        {label} {required && <Field.RequiredIndicator />}
      </Field.Label>
      <Textarea border="0" bg="#00000044" {...props}/>
    </Field.Root>
}

export function PageWrapper({children, ...props}:StackProps)
{
    return <VStack w="100%" h="100%" alignItems="start" ml="3em" mt="6em" {...props}>
        {children}
    </VStack>
}

export function PageHeading({route:AppRoute, ...props}: {route: AppRoute} & HeadingProps)
{
    return <Heading as="h1" {...props}>
                <HStack gap="0.75em" fontSize="1.5em">
                    {newConceptRoute.icon}
                    <Text>{newConceptRoute.name}</Text>
                </HStack>
            </Heading>
}

