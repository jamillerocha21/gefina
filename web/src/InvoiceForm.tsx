import { useState } from 'react';

import { Invoice, InvoiceInput, InvoiceStatus } from './invoiceType';
import { CustomerOption } from './customerType';

interface InvoiceFormProps {
    invoice: Invoice | null;
    customers: CustomerOption[];
    error: string | null;
    onDelete: () => void;
    onCancel: () => void;
    onSubmit: (values: InvoiceInput) => void;
    busy: boolean;
}

export default function InvoiceForm(prosp: InvoiceFormProps) {
    const [customerId, setCustomerId] = useState(!prosp.invoice ? '': prosp.invoice.customer.id);
    const [amount, setAmount] = useState(!prosp.invoice ? '': (prosp.invoice.amount / 100));
    const [status, setStatus] = useState<InvoiceStatus>(!prosp.invoice ? 'pending' : prosp.invoice.status);
    const [issueDate, setIssueDate] = useState(!prosp.invoice ? '' : prosp.invoice.issueDate);
    const [dueDate, setdueDate] = useState(!prosp.invoice ? '' : prosp.invoice.dueDate);

    const handleSubmit = (event : SubmitEvent) => {
        event.preventDefault();
        prosp.onSubmit({
            customerId: Number(customerId),
            amount: Math.round(Number(amount) * 100),
            status,
            issueDate,
            dueDate
        });
    }
    return <form>
        <div>
            <label htmlFor='customer'>Cliente</label>
            <select id='customer'></select>
        </div>
        <div>
            <label htmlFor='amount'>Valor</label>
            <input 
                id='amount' 
                type='number' 
                step='0.01' 
                min='0.01'
                required
            />
        </div>
        <div>
            <label htmlFor='status'>Situação</label>
            <select id='status'>
                <option>Pendente</option>
                <option>Paga</option>
            </select>
        </div>
        <div>
            <label htmlFor='issueDate'>Emissão</label>
            <input
                id='issueDate'
                type='date'
                required
            />
        </div>
        <div>
            <label htmlFor='dueDate'>Vencimento</label>
            <input
                id='dueDate'
                type='date'
                required
            />
        </div>
        <div>
            <button type='button'>Excluir</button>
            <button type='button'>Cancelar</button>
            <button type='submit'>Salvar</button>
        </div>
    </form>;
}