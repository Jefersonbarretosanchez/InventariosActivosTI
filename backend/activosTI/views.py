from django.shortcuts import render, redirect, get_object_or_404
from .forms import *
from .models import Persona, CatAlianza, CatArea, CatRegion, CatCargo, CatEstadoPersona
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy

# Create your views here.
class PersonaCreate(CreateView):
    """"Vista Persona"""
    model = Persona
    form_class = PersonaCreate
    template_name = 'personaCreate.html'
    context_object_name = 'personas'
    success_url = reverse_lazy('list')    
    
    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        if form.is_valid():
            new_req = form.save(commit=False)
            print(new_req)
            new_req.save()
            return redirect('list')


class PersonaLista(ListView):
    """Lista personas"""
    model = Persona
    template_name = 'persona.html'
    context_object_name = 'personas'

class PersonaUpdate(UpdateView):
    """Actualiza Requerimientos"""
    model = Persona
    form_class = PersonaUpdate
    template_name = 'personaEdit.html'
    context_object_name = 'reqs'
    success_url = reverse_lazy('list')

    def form_valid(self, form):
        return super().form_valid(form)
    
class PersonaDelete(DeleteView):
    """"Vista para eliminar Personas"""
    model=Persona
    template_name='persona_confirm_delete.html'
    success_url = reverse_lazy('list')
