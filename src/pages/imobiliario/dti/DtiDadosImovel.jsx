import React, { useState, useCallback, useEffect } from 'react';
import '../../../assets/styles/dtiDadosImovel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome, faChevronRight, faChevronLeft, faFileAlt, faBuilding, faClipboard,
    faMapMarkerAlt, faUser, faIdCard, faEnvelope, faPhone, faDollarSign,
    faCalendarAlt, faPaperclip, faCheck, faTrash, faPlus, faLock, faEye,
    faTimes, faEdit
} from '@fortawesome/free-solid-svg-icons';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    React.useEffect(() => {
        let modalCount = 0;
        document.body.style.overflow = 'hidden';
        modalCount++;

        return () => {
            modalCount--;
            if (modalCount === 0) {
                document.body.style.overflow = 'unset';
            }
        };
    }, []);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content" onClick={handleContentClick}>
                <div className="modal-header">
                    {title && <h4>{title}</h4>}
                    <button className="modal-close-icon" onClick={onClose} aria-label="Fechar modal">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

function useListFormManager(initialState, onAddCallback, validationFn) {
    const [formState, setFormState] = useState(initialState);
    const handleInputChange = useCallback((e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormState(prev => ({ ...prev, [name]: files[0], [`${name}Name`]: files[0]?.name || "" }));
        } else { setFormState(prev => ({ ...prev, [name]: value })); } }, []);
    const handleResetForm = useCallback(() => {
        setFormState(initialState);
        Object.keys(initialState).forEach(key => {
            const fileInputId = key.toLowerCase().includes('file') ? key : null;
             if (fileInputId) { const fileInput = document.getElementById(fileInputId); if (fileInput && fileInput.type === 'file') try { fileInput.value = ""; } catch (err) {} }
             if (key.toLowerCase().endsWith('filename') || key.toLowerCase().endsWith('name')) { const baseName = key.replace(/filename$/i, '').replace(/name$/i, ''); const fileInput = document.getElementById(baseName + 'File'); if (fileInput && fileInput.type === 'file') try { fileInput.value = ""; } catch (err) {} }
        }); }, [initialState]);
    const handleAddItem = useCallback(() => {
        const validationResult = validationFn ? validationFn(formState) : true;
        if (validationResult === true) { onAddCallback(formState); handleResetForm(); }
        else { alert(typeof validationResult === 'string' ? validationResult : "Preencha os campos obrigatórios."); } }, [formState, validationFn, onAddCallback, handleResetForm]);
    return { formState, setFormState, handleInputChange, handleAddItem, handleResetForm };
}

const validateDadosImovel = (dados) => {
    if (!dados.inscricaoImobiliaria) return false; if (dados.registroCartorio === 'sim') { if (!dados.cartorioRegistro || !dados.inscricaoMatricula) return false; } return true; };
const validateComprador = (compradores) => compradores.length > 0;
const validateVendedor = (vendedores) => vendedores.length > 0;
const validateDadosTransacao = (dados) => !!(dados.valorTransacao && dados.dataTransacao && dados.valorAvista && dados.valorFinanciado && dados.valorItiv);

const DtiDadosImovel = () => {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [isStepValid, setIsStepValid] = useState(false);

    const [dadosImovel, setDadosImovel] = useState({
        inscricaoImobiliaria: "", registroCartorio: "nao", cartorioRegistro: "", inscricaoMatricula: "",
        logradouro: "Caminho 39, quadra E, Rua Rosas Park", numero: "04", bloco: "E",
        cep: "4134-2020", bairro: "Boca da Mata", complemento: "Casa",
    });
    const [compradores, setCompradores] = useState([]);
    const [vendedores, setVendedores] = useState([]);
    const [dadosTransacao, setDadosTransacao] = useState({
        valorTransacao: "", dataTransacao: "", valorAvista: "", valorFinanciado: "", valorItiv: "",
        aliquotas: "AV: 2,00% | Fin: 1,00%",
    });
    const [anexos, setAnexos] = useState([]);

    const handleDadosImovelChange = useCallback((field, value) => setDadosImovel(prev => ({ ...prev, [field]: value })), []);
    const handleAddComprador = useCallback((comprador) => setCompradores(prev => [...prev, comprador]), []);
    const handleRemoveComprador = useCallback((index) => setCompradores(prev => prev.filter((_, i) => i !== index)), []);
    const handleAddVendedor = useCallback((vendedor) => setVendedores(prev => [...prev, vendedor]), []);
    const handleRemoveVendedor = useCallback((index) => setVendedores(prev => prev.filter((_, i) => i !== index)), []);
    const handleDadosTransacaoChange = useCallback((field, value) => { if(field !== 'aliquotas') setDadosTransacao(prev => ({ ...prev, [field]: value })); }, []);
    const handleAddAnexo = useCallback((anexoData) => { if (anexoData.anexoFile && anexoData.tipo) { setAnexos(prev => [...prev, { tipo: anexoData.tipo, file: anexoData.anexoFile, data: new Date().toLocaleString() }]); } }, []);
    const handleRemoveAnexo = useCallback((index) => setAnexos(prev => prev.filter((_, i) => i !== index)), []);
    const handleUpdateAnexoTipo = useCallback((index, novoTipo) => { setAnexos(prevAnexos => prevAnexos.map((anexo, i) => i === index ? { ...anexo, tipo: novoTipo } : anexo )); }, []);

    const paginas = React.useMemo(() => [
        { id: 1, titulo: "Dados Imóvel", validator: () => validateDadosImovel(dadosImovel), conteudo: <DadosImovel dados={dadosImovel} onChange={handleDadosImovelChange} /> },
        { id: 2, titulo: "Comprador", validator: () => validateComprador(compradores), conteudo: <Comprador compradores={compradores} onAdd={handleAddComprador} onRemove={handleRemoveComprador} /> },
        { id: 3, titulo: "Vendedor", validator: () => validateVendedor(vendedores), conteudo: <Vendedor vendedores={vendedores} onAdd={handleAddVendedor} onRemove={handleRemoveVendedor} /> },
        { id: 4, titulo: "Dados Transação", validator: () => validateDadosTransacao(dadosTransacao), conteudo: <DadosTransacao dados={dadosTransacao} onChange={handleDadosTransacaoChange} anexos={anexos} onAnexoAdd={handleAddAnexo} onAnexoRemove={handleRemoveAnexo} onUpdateTipo={handleUpdateAnexoTipo} /> },
        { id: 5, titulo: "Confirmação DTI", validator: () => true, conteudo: <ConfirmacaoDTI dadosImovel={dadosImovel} compradores={compradores} vendedores={vendedores} transacao={dadosTransacao} anexos={anexos} /> },
    ], [dadosImovel, compradores, vendedores, dadosTransacao, anexos, handleDadosImovelChange, handleAddComprador, handleRemoveComprador, handleAddVendedor, handleRemoveVendedor, handleDadosTransacaoChange, handleAddAnexo, handleRemoveAnexo, handleUpdateAnexoTipo]);

    useEffect(() => { const paginaInfo = paginas.find(p => p.id === paginaAtual); setIsStepValid(paginaInfo && paginaInfo.validator ? paginaInfo.validator() : false); }, [paginaAtual, paginas]);

    const handleProximo = () => { if (isStepValid) { if (paginaAtual < paginas.length) setPaginaAtual(paginaAtual + 1); } else { alert("Preencha os campos obrigatórios para avançar."); } };
    const handleVoltar = () => { if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1); };
    const handleFinalizar = () => { console.log("Dados Finais:", { dadosImovel, compradores, vendedores, dadosTransacao, anexos }); alert("Finalização concluída!"); };

    return (
        <div className="dti-container">
            <div className="dti-header">{paginas.map((p) => (<div key={p.id} className={`dti-header-item ${paginaAtual === p.id ? 'active' : ''}`}><span className="dti-header-number">{p.id}</span> {p.titulo}</div>))}</div>
            <div className="dti-content">
                {paginas.find((p) => p.id === paginaAtual)?.conteudo}
                <div className="dti-botoes">
                    <button className="btn btn-secondary" onClick={handleVoltar} disabled={paginaAtual === 1}><FontAwesomeIcon icon={faChevronLeft} /> Voltar</button>
                    <button className={`btn ${paginaAtual === paginas.length ? 'btn-success' : 'btn-primary'}`} onClick={paginaAtual === paginas.length ? handleFinalizar : handleProximo} disabled={paginaAtual !== paginas.length && !isStepValid}>
                        {paginaAtual === paginas.length ? "Finalizar" : "Próximo"} <FontAwesomeIcon icon={paginaAtual === paginas.length ? faCheck : faChevronRight} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const DadosImovel = ({ dados, onChange }) => {
    const [zona, setZona] = useState(dados.zona || "urbana");
    const handleZonaChange = (e) => {
        const value = e.target.value;
        setZona(value);
        onChange('zona', value);
        if (value === "rural") {
            onChange('inscricaoImobiliaria', "");
            onChange('registroCartorio', "nao");
            onChange('cartorioRegistro', "");
            onChange('inscricaoMatricula', "");
            onChange('logradouro', "");
            onChange('numero', "");
            onChange('bloco', "");
            onChange('cep', "");
            onChange('bairro', "");
            onChange('complemento', "");
        }
    };
    const handleRegistroChange = (e) => onChange('registroCartorio', e.target.value);
    const isRegistroSim = dados.registroCartorio === 'sim';

    return (
        <div className="dados-imovel">
            <h4>{zona === "urbana" ? "Dados do Imóvel" : "Dados do Imóvel Rural"}</h4>
            <hr />
            <div className="form-row">
                <div className="form-group" style={{ maxWidth: 150, minWidth: 120, marginRight: 12 }}>
                    <label htmlFor="zona">Zona *</label>
                    <select id="zona" className="form-control" value={zona} onChange={handleZonaChange}>
                        <option value="urbana">Urbana</option>
                        <option value="rural">Rural</option>
                    </select>
                </div>
                {zona === "urbana" && (
                    <>
                        <div className="form-group inscricao-imobiliaria" style={{ flex: 2, marginRight: 12 }}>
                            <label htmlFor="inscricaoImobiliaria">Inscrição Imobiliária *</label>
                            <input type="text" id="inscricaoImobiliaria" className="form-control" value={dados.inscricaoImobiliaria} onChange={(e) => onChange('inscricaoImobiliaria', e.target.value)} required />
                        </div>
                        <div className="form-group question" style={{ flex: 1 }}>
                            <label htmlFor="registroCartorio">Registro em cartório?</label>
                            <select id="registroCartorio" className="form-control" value={dados.registroCartorio} onChange={handleRegistroChange}>
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select>
                        </div>
                    </>
                )}
            </div>
            {zona === "urbana" ? (
                <>
                    <div className="form-row">
                        <div className="form-group question">
                            <label htmlFor="registroCartorio">Registro em cartório?</label>
                            <select id="registroCartorio" className="form-control" value={dados.registroCartorio} onChange={handleRegistroChange}>
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select>
                        </div>
                    </div>
                    {isRegistroSim && (
                        <div className="form-row">
                            <div className="form-group half">
                                <label htmlFor="cartorioRegistro">Cartório de Registro *</label>
                                <select id="cartorioRegistro" className="form-control" value={dados.cartorioRegistro} onChange={(e) => onChange('cartorioRegistro', e.target.value)} required={isRegistroSim}>
                                    <option value="">Selecione</option>
                                    <option value="Cartório 1">Cartório 1</option>
                                    <option value="Cartório 2">Cartório 2</option>
                                </select>
                            </div>
                            <div className="form-group half">
                                <label htmlFor="inscricaoMatricula">Inscrição Matrícula *</label>
                                <input type="text" id="inscricaoMatricula" className="form-control" value={dados.inscricaoMatricula} onChange={(e) => onChange('inscricaoMatricula', e.target.value)} required={isRegistroSim} />
                            </div>
                        </div>
                    )}
                    <h4>Endereço do Imóvel</h4>
                    <hr />
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="logradouro">Logradouro <FontAwesomeIcon icon={faLock} size="xs" /></label>
                            <input type="text" id="logradouro" className="form-control" value={dados.logradouro} readOnly />
                        </div>
                        <div className="form-group small">
                            <label htmlFor="numero">Número <FontAwesomeIcon icon={faLock} size="xs" /></label>
                            <input type="text" id="numero" className="form-control" value={dados.numero} readOnly />
                        </div>
                        <div className="form-group small">
                            <label htmlFor="bloco">Bloco <FontAwesomeIcon icon={faLock} size="xs" /></label>
                            <input type="text" id="bloco" className="form-control" value={dados.bloco} readOnly />
                        </div>
                        <div className="form-group small">
                            <label htmlFor="cep">CEP <FontAwesomeIcon icon={faLock} size="xs" /></label>
                            <input type="text" id="cep" className="form-control" value={dados.cep} readOnly />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group bairro">
                            <label htmlFor="bairro">Bairro <FontAwesomeIcon icon={faLock} size="xs" /></label>
                            <input type="text" id="bairro" className="form-control" value={dados.bairro} readOnly />
                        </div>
                        <div className="form-group complemento">
                            <label htmlFor="complemento">Complemento <FontAwesomeIcon icon={faLock} size="xs" /></label>
                            <input type="text" id="complemento" className="form-control" value={dados.complemento} readOnly />
                        </div>
                    </div>
                </>
            ) : (
                <div className="form-row">
                    <div className="form-group" style={{ width: "100%" }}>
                        <label htmlFor="descricaoImovelRural">Endereço e Descrição do imovel rural *</label>
                        <textarea
                            id="descricaoImovelRural"
                            className="form-control"
                            value={dados.descricaoImovelRural || ""}
                            onChange={(e) => onChange('descricaoImovelRural', e.target.value)}
                            maxLength={2000}
                            rows={6}
                            required
                            placeholder="endereço/descrição imovel rural"
                        />
                        <div style={{ textAlign: "right", fontSize: "12px", color: "#888" }}>
                            {`${(dados.descricaoImovelRural || "").length}/2000`}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Comprador = ({ compradores, onAdd, onRemove }) => {
    const [tipoPessoaForm, setTipoPessoaForm] = useState("fisico"); const validaCompradorForm = (form) => form.documento ? true : "Preencha o Documento para adicionar.";
    const { formState: novoCompradorForm, handleInputChange, handleAddItem, handleResetForm } = useListFormManager( { documento: "", nome: "", email: "", telefone: "", celular: "" }, (form) => onAdd({ ...form, tipo: tipoPessoaForm === 'fisico' ? 'Físico' : 'Jurídico' }), validaCompradorForm );
    const handleTipoChange = (novoTipo) => { setTipoPessoaForm(novoTipo); handleResetForm(); };
    return ( <div className="dados-comprador"> <h4>Dados do Comprador</h4> <hr /> <div className="form-row"> <div className="form-group tipo-comprador"> <label>Tipo *</label> <div className="toggle-switch"> <input type="radio" id="fisico_comp" name="tipoCompradorForm" value="fisico" checked={tipoPessoaForm === "fisico"} onChange={() => handleTipoChange("fisico")} /> <label htmlFor="fisico_comp">Físico</label> <input type="radio" id="juridico_comp" name="tipoCompradorForm" value="juridico" checked={tipoPessoaForm === "juridico"} onChange={() => handleTipoChange("juridico")} /> <label htmlFor="juridico_comp">Jurídico</label> <div className="toggle-indicator"></div> </div> </div> <div className="form-group"> <label htmlFor="comprador_documento">Número documento *</label> <input type="text" id="comprador_documento" name="documento" className="form-control" placeholder={tipoPessoaForm === "fisico" ? "CPF" : "CNPJ"} value={novoCompradorForm.documento} onChange={handleInputChange} required /> </div> <div className="form-group"> <label htmlFor="comprador_nome">Nome/Razão Social</label> <input type="text" id="comprador_nome" name="nome" className="form-control" value={novoCompradorForm.nome} onChange={handleInputChange} /> </div> </div> <div className="form-row"> <div className="form-group"> <label htmlFor="comprador_email">E-mail</label> <input type="email" id="comprador_email" name="email" className="form-control" value={novoCompradorForm.email} onChange={handleInputChange} /> </div> <div className="form-group"> <label htmlFor="comprador_telefone">Telefone</label> <input type="text" id="comprador_telefone" name="telefone" className="form-control" value={novoCompradorForm.telefone} onChange={handleInputChange} /> </div> <div className="form-group"> <label htmlFor="comprador_celular">Celular</label> <input type="text" id="comprador_celular" name="celular" className="form-control" value={novoCompradorForm.celular} onChange={handleInputChange} /> </div> <div className="form-group"> <label>&nbsp;</label> <button type="button" className="btn-acoes" onClick={handleAddItem}><FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }}/> Adicionar Comprador</button> </div> </div> {compradores.length > 0 && ( <div className="lista-compradores"> <h5><FontAwesomeIcon icon={faUser} /> Lista de Compradores</h5> {compradores.map((c, index) => ( <div className="comprador-item" key={index}> <span>{c.tipo}</span> <span>{c.nome || '-'}</span> <span>{c.documento}</span> <span>{c.email || '-'}</span> <span>{c.telefone || '-'}</span> <span>{c.celular || '-'}</span> <button type="button" className="btn btn-danger" onClick={() => onRemove(index)}><FontAwesomeIcon icon={faTrash} /></button> </div> ))} </div> )} </div> ); };

const Vendedor = ({ vendedores, onAdd, onRemove }) => {
     const validaVendedorForm = (form) => form.documento ? true : "Preencha o CPF/CNPJ para adicionar."; const { formState: novoVendedorForm, handleInputChange, handleAddItem } = useListFormManager({ documento: "", nome: "", nomeFantasia: "", email: "", telefone: "", celular: "" }, onAdd, validaVendedorForm );
    return ( <div className="dados-vendedor"> <h4>Dados do Vendedor</h4> <hr /> <div className="form-row"> <div className="form-group"> <label htmlFor="vendedor_documento">CPF/CNPJ *</label> <input type="text" id="vendedor_documento" name="documento" className="form-control" placeholder="Obrigatório" value={novoVendedorForm.documento} onChange={handleInputChange} required/> </div> <div className="form-group"> <label htmlFor="vendedor_nome">Nome/Razão Social</label> <input type="text" id="vendedor_nome" name="nome" className="form-control" value={novoVendedorForm.nome} onChange={handleInputChange} /> </div> <div className="form-group"> <label htmlFor="vendedor_nomeFantasia">Nome Fantasia</label> <input type="text" id="vendedor_nomeFantasia" name="nomeFantasia" className="form-control" value={novoVendedorForm.nomeFantasia} onChange={handleInputChange} /> </div> </div> <div className="form-row"> <div className="form-group"> <label htmlFor="vendedor_email">E-mail</label> <input type="email" id="vendedor_email" name="email" className="form-control" value={novoVendedorForm.email} onChange={handleInputChange} /> </div> <div className="form-group"> <label htmlFor="vendedor_telefone">Telefone</label> <input type="text" id="vendedor_telefone" name="telefone" className="form-control" value={novoVendedorForm.telefone} onChange={handleInputChange} /> </div> <div className="form-group"> <label htmlFor="vendedor_celular">Celular</label> <input type="text" id="vendedor_celular" name="celular" className="form-control" value={novoVendedorForm.celular} onChange={handleInputChange} /> </div> <div className="form-group"> <label>&nbsp;</label> <button type="button" className="btn-acoes" onClick={handleAddItem}><FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} /> Adicionar Vendedor</button> </div> </div> {vendedores.length > 0 && ( <div className="lista-vendedores"> <h5><FontAwesomeIcon icon={faUser} /> Lista de Vendedores</h5> {vendedores.map((v, index) => ( <div className="vendedor-item" key={index}> <span>{v.documento}</span> <span>{v.nome || '-'}</span> <span>{v.nomeFantasia || '-'}</span> <span>{v.email || '-'}</span> <span>{v.telefone || '-'}</span> <span>{v.celular || '-'}</span> <button type="button" className="btn btn-danger" onClick={() => onRemove(index)}><FontAwesomeIcon icon={faTrash} /></button> </div> ))} </div> )} </div> ); };

const DadosTransacao = ({ dados, onChange, anexos, onAnexoAdd, onAnexoRemove, onUpdateTipo }) => {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewFile, setPreviewFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingAnexoIndex, setEditingAnexoIndex] = useState(null);
    const [editingAnexoTipo, setEditingAnexoTipo] = useState('');

    const validaAnexoForm = (form) => form.tipo && form.anexoFileName ? true : "Selecione Tipo e Arquivo.";
    const { formState: novoAnexoForm, handleInputChange: handleAnexoInputChange, handleAddItem: handleAnexarClick } = useListFormManager( { tipo: "", anexoFile: null, anexoFileName: "" }, onAnexoAdd, validaAnexoForm );

    const handlePreviewClick = (anexo) => { if (!anexo.file) return; const url = URL.createObjectURL(anexo.file); setPreviewUrl(url); setPreviewFile(anexo); setIsPreviewOpen(true); };
    const handleCloseModalPreview = () => { setIsPreviewOpen(false); setPreviewFile(null); if (previewUrl) { URL.revokeObjectURL(previewUrl); setPreviewUrl(''); } };
    useEffect(() => { return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }; }, [previewUrl]);
    const renderPreview = () => { if (!previewFile || !previewFile.file || !previewUrl) return <p>Nenhum arquivo.</p>; const fileType = previewFile.file.type; if (fileType.startsWith('image/')) return <img src={previewUrl} alt={`Preview`} style={{ maxWidth: '100%', maxHeight: '70vh' }} />; if (fileType === 'application/pdf') return <iframe src={previewUrl} title={`Preview`} width="100%" height="600px" style={{ border: 'none' }}></iframe>; return ( <div><p><strong>Preview não disponível.</strong></p><p>Nome: {previewFile.file.name}</p><p>Tipo: {fileType}</p></div> ); };

    const handleEditClick = (index, currentTipo) => { setEditingAnexoIndex(index); setEditingAnexoTipo(currentTipo); setIsEditModalOpen(true); };
    const handleCloseModalEdit = () => { setIsEditModalOpen(false); setEditingAnexoIndex(null); setEditingAnexoTipo(''); };
    const handleSaveEdit = () => { if (editingAnexoIndex !== null && editingAnexoTipo.trim() !== "") { onUpdateTipo(editingAnexoIndex, editingAnexoTipo.trim()); handleCloseModalEdit(); } else { alert("O tipo do documento não pode ficar vazio."); } };

    return (
        <div className="dados-transacao">
            <h4>Dados da Venda</h4> <hr />
            <div className="form-row"> <div className="form-group"> <label htmlFor="valorTransacao">Valor Transação R$ *</label> <input type="text" id="valorTransacao" name="valorTransacao" className="form-control" value={dados.valorTransacao} onChange={(e) => onChange('valorTransacao', e.target.value)} required /> </div> <div className="form-group"> <label htmlFor="dataTransacao">Data Transação *</label> <input type="date" id="dataTransacao" name="dataTransacao" className="form-control" value={dados.dataTransacao} onChange={(e) => onChange('dataTransacao', e.target.value)} required /> </div> <div className="form-group"> <label htmlFor="valorAvista">Valor À Vista R$ *</label> <input type="text" id="valorAvista" name="valorAvista" className="form-control" value={dados.valorAvista} onChange={(e) => onChange('valorAvista', e.target.value)} required /> </div> </div>
            <div className="form-row"> <div className="form-group"> <label htmlFor="valorFinanciado">Valor Financiado R$ *</label> <input type="text" id="valorFinanciado" name="valorFinanciado" className="form-control" value={dados.valorFinanciado} onChange={(e) => onChange('valorFinanciado', e.target.value)} required /> </div> <div className="form-group"> <label htmlFor="valorItiv">Valor ITIV R$ *</label> <input type="text" id="valorItiv" name="valorItiv" className="form-control" value={dados.valorItiv} onChange={(e) => onChange('valorItiv', e.target.value)} required /> </div> <div className="form-group"> <label htmlFor="aliquotas">Alíquotas <FontAwesomeIcon icon={faLock} size="xs" /></label> <input type="text" id="aliquotas" name="aliquotas" className="form-control" value={dados.aliquotas} readOnly /> </div> </div>
            <h4>Anexar Documentos</h4> <hr />
            <div className="form-row"> <div className="form-group"> <label htmlFor="tipo">Tipo Documento</label> <input type="text" id="tipo" name="tipo" className="form-control" value={novoAnexoForm.tipo} onChange={handleAnexoInputChange} /> </div> <div className="form-group"> <label htmlFor="anexoFile">Anexo</label> <input type="file" id="anexoFile" name="anexoFile" className="form-control" onChange={handleAnexoInputChange} /> </div> <div className="form-group"> <label>&nbsp;</label> <button type="button" className="btn-acoes" onClick={handleAnexarClick}><FontAwesomeIcon icon={faPaperclip} style={{ marginRight: '8px' }} /> Anexar</button> </div> </div>
            {anexos.length > 0 && (
                 <div className="lista-documentos">
                     <h5><FontAwesomeIcon icon={faPaperclip} /> Lista de Documentos Anexados</h5>
                    {anexos.map((doc, index) => (
                        <div className="documento-item" key={index}>
                            <span>{doc.tipo}</span> <span>{doc.file.name}</span> <span>{doc.data}</span>
                            <div style={{ display: 'flex', gap: '5px', marginLeft: 'auto' }}>
                                <button type="button" className="btn btn-info btn-sm" title="Editar Tipo" onClick={() => handleEditClick(index, doc.tipo)} style={{ padding: '5px 8px'}} > <FontAwesomeIcon icon={faEdit} /> </button>
                                <button type="button" className="btn btn-secondary btn-sm" title="Visualizar" onClick={() => handlePreviewClick(doc)} style={{ padding: '5px 8px'}} > <FontAwesomeIcon icon={faEye} /> </button>
                                <button type="button" className="btn btn-danger btn-sm" title="Remover" onClick={() => onAnexoRemove(index)} style={{ padding: '5px 8px'}} > <FontAwesomeIcon icon={faTrash} /> </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Modal
                isOpen={isPreviewOpen}
                onClose={handleCloseModalPreview}
                className="modal-view"
                title={`Visualizando: ${previewFile?.tipo || ''} - ${previewFile?.file?.name || ''}`}
            >
                {renderPreview()}
            </Modal>
             <Modal isOpen={isEditModalOpen} onClose={handleCloseModalEdit} title={`Editar Tipo: ${anexos[editingAnexoIndex]?.file?.name || ''}`}>
                <div className="form-group">
                    <label htmlFor="editAnexoTipo">Novo Tipo:</label>
                    <input type="text" id="editAnexoTipo" className="form-control" value={editingAnexoTipo} onChange={(e) => setEditingAnexoTipo(e.target.value)} autoFocus />
                </div>
                <div className="modal-action-buttons">
                     <button className="btn btn-secondary" onClick={handleCloseModalEdit}>Cancelar</button>
                     <button className="btn btn-primary" onClick={handleSaveEdit}>Salvar Alteração</button>
                </div>
            </Modal>
        </div>
    );
};

const ConfirmacaoDTI = ({ dadosImovel, compradores, vendedores, transacao, anexos }) => {
    const formatarEndereco = (imovel) => {
        let e = imovel.logradouro || '';
        if (imovel.numero) e += `, Nº ${imovel.numero}`;
        if (imovel.bloco) e += `, Bloco ${imovel.bloco}`;
        if (imovel.complemento) e += `, ${imovel.complemento}`;
        if (imovel.bairro) e += `, Bairro ${imovel.bairro}`;
        if (imovel.cep) e += `, CEP ${imovel.cep}`;
        return e || 'N/I';
    };

    const temDadosRegistro = dadosImovel.registroCartorio === 'sim';
    const temDadosTransacao = Object.entries(transacao)
        .filter(([k]) => k !== 'aliquotas')
        .some(([, v]) => v !== "" && v !== null);

    return (
        <div className="confirmacao-dti">
            {/* Dados do Imóvel */}
            <h5 className="titulo-secao">
                <FontAwesomeIcon icon={faHome} /> Imóvel
            </h5>
            <hr />
            <table className="tabela-dti dados-imovel">
                <tbody>
                    <tr>
                        <th>Inscrição</th>
                        <td>{dadosImovel.inscricaoImobiliaria || 'N/I'}</td>
                    </tr>
                    <tr>
                        <th>Registrado?</th>
                        <td>{dadosImovel.registroCartorio === 'sim' ? "Sim" : "Não"}</td>
                    </tr>
                    {temDadosRegistro && (
                        <>
                            <tr>
                                <th>Cartório</th>
                                <td>{dadosImovel.cartorioRegistro || 'N/I'}</td>
                            </tr>
                            <tr>
                                <th>Matrícula</th>
                                <td>{dadosImovel.inscricaoMatricula || 'N/I'}</td>
                            </tr>
                        </>
                    )}
                    <tr>
                        <th>Endereço</th>
                        <td>{formatarEndereco(dadosImovel)}</td>
                    </tr>
                </tbody>
            </table>

            {/* Compradores */}
            {compradores?.length > 0 && (
                <>
                    <h5 className="titulo-secao">
                        <FontAwesomeIcon icon={faUser} /> Compradores
                    </h5>
                    <hr />
                    <table className="tabela-dti">
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Nome</th>
                                <th>Doc</th>
                                <th>E-mail</th>
                                <th>Tel</th>
                                <th>Cel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {compradores.map((c, i) => (
                                <tr key={`c${i}`}>
                                    <td>{c.tipo}</td>
                                    <td>{c.nome || '-'}</td>
                                    <td>{c.documento}</td>
                                    <td>{c.email || '-'}</td>
                                    <td>{c.telefone || '-'}</td>
                                    <td>{c.celular || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            {/* Vendedores */}
            {vendedores?.length > 0 && (
                <>
                    <h5 className="titulo-secao">
                        <FontAwesomeIcon icon={faUser} /> Vendedores
                    </h5>
                    <hr />
                    <table className="tabela-dti">
                        <thead>
                            <tr>
                                <th>Doc</th>
                                <th>Nome</th>
                                <th>Fantasia</th>
                                <th>E-mail</th>
                                <th>Tel</th>
                                <th>Cel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendedores.map((v, i) => (
                                <tr key={`v${i}`}>
                                    <td>{v.documento}</td>
                                    <td>{v.nome || '-'}</td>
                                    <td>{v.nomeFantasia || '-'}</td>
                                    <td>{v.email || '-'}</td>
                                    <td>{v.telefone || '-'}</td>
                                    <td>{v.celular || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            {/* Transação */}
            {temDadosTransacao && (
                <>
                    <h5 className="titulo-secao">
                        <FontAwesomeIcon icon={faDollarSign} /> Transação
                    </h5>
                    <hr />
                    <table className="tabela-dti dados-transacao">
                        <tbody>
                            <tr>
                                <th>Valor R$</th>
                                <td>{transacao.valorTransacao || 'N/I'}</td>
                            </tr>
                            <tr>
                                <th>Data</th>
                                <td>
                                    {transacao.dataTransacao
                                        ? new Date(transacao.dataTransacao + 'T00:00:00').toLocaleDateString('pt-BR')
                                        : 'N/I'}
                                </td>
                            </tr>
                            <tr>
                                <th>À Vista R$</th>
                                <td>{transacao.valorAvista || 'N/I'}</td>
                            </tr>
                            <tr>
                                <th>Financiado R$</th>
                                <td>{transacao.valorFinanciado || 'N/I'}</td>
                            </tr>
                            <tr>
                                <th>ITIV R$</th>
                                <td>{transacao.valorItiv || 'N/I'}</td>
                            </tr>
                            <tr>
                                <th>Alíquotas</th>
                                <td>{transacao.aliquotas}</td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )}

            {/* Anexos */}
            {anexos?.length > 0 && (
                <>
                    <h5 className="titulo-secao">
                        <FontAwesomeIcon icon={faPaperclip} /> Anexos
                    </h5>
                    <hr />
                    <table className="tabela-dti">
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Arquivo</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {anexos.map((a, i) => (
                                <tr key={`a${i}`}>
                                    <td>{a.tipo}</td>
                                    <td>{a.file?.name || 'N/I'}</td>
                                    <td>{a.data}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default DtiDadosImovel;