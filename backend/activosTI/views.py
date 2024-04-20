from django.shortcuts import render, redirect, get_object_or_404
from .forms import PersonaCreate
from .models import Persona, CatAlianza, CatArea, CatRegion, CatCargo, CatEstadoPersona
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView, CreateView
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
            new_req.area = form.cleaned_data['area']
            new_req.alianza = form.cleaned_data['alianza']
            new_req.region = form.cleaned_data['region']
            new_req.cargo = form.cleaned_data['cargo']
            new_req.estado = form.cleaned_data['estado']
            print(new_req)
            new_req.save()
            return redirect('list')


class PersonaLista(ListView):
    """Lista personas"""
    model = Persona
    template_name = 'persona.html'
    context_object_name = 'personas'


def persona(request):
    form = PersonaCreate()
    persona = Persona.objects.all()
    alianza = CatAlianza.objects.all()
    area = CatArea.objects.all()
    region = CatRegion.objects.all()
    cargo = CatCargo.objects.all()
    estado = CatEstadoPersona.objects.all()
    paginate_by = 10

    if request.method == 'GET':
        print('Exito Get')
        return render(request, 'personaCreate.html', {
            'persona': persona,
            'alianza': alianza,
            'area': area,
            'region': region,
            'cargo': cargo,
            'estado': estado,
            'form': PersonaCreate()
        })
    else:
        try:
            form = PersonaCreate(request.POST)
            if form.is_valid():
                persona = persona()
                persona.alianza = form.cleaned_data['alianza']
                persona.save()
                print('Exito POST')
                return redirect('list')            
        except ValueError:
            print('Error')
            return render(request, 'personaCreate.html', {
                'persona': persona,
                'alianza': alianza,
                'area': area,
                'region': region,
                'cargo': cargo,
                'estado': estado,
                'form': PersonaCreate
            })
